import { Text } from "@/components/base/Text";
import { Input } from "@/components/base/TextInput";
import { ActivityIndicator, View, Animated, KeyboardAvoidingView } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/base/Button";
import { useEffect, useState } from "react";
import { Icons } from "@/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountWithCredentials, forgotPassword, providerLogin, signInWithCredentials } from "@/api/auth";
import { Alert } from "@/components/alert";
import { useNavigation } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import { useAuthRequest } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AppleAuthentication from 'expo-apple-authentication';

export default function AuthScreen() {
    const navigation = useNavigation();
    const [authMode, setAuthMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showServerError, setShowServerError] = useState(false);
    const [showResetPasswordMessage, setShowResetPasswordMessage] = useState(false);

    const [loading, setLoading] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '547353025123-956s49ktpffi4hdp2g1fvqg953lkbiud.apps.googleusercontent.com',
    });
    const [facebookRequest, facebookResponse, promptFacebookAsync] = Facebook.useAuthRequest({
        clientId: '1997603150724584', 
    });

    const [firstnameOpacity] = useState(new Animated.Value(0));
    const [lastnameOpacity] = useState(new Animated.Value(0));

    const [isLoadingProvider, setIsLoadingProvider] = useState(false);

    const formSchema = z.object({
        email: z.string().email("Enter an valid email"),
        ...(authMode === "login" || authMode === "signup" ? {
            password: z.string().min(6, "Password must be at least 6 characters long").refine(s => !s.includes(' '), 'Password cannot have spaces')
        } : {}),
        ...(authMode === "signup" ? {
            firstname: z.string().min(1, "First name is required"),
            lastname: z.string().min(1, "Last name is required"),
        } : {})
    })
    
    type FormData = z.infer<typeof formSchema>

    const { 
        register, 
        formState:{errors, isSubmitting},
        control,
        handleSubmit,
        setError
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
        },
        resolver: zodResolver(formSchema)
    })

    const handleCredentialsLogin:SubmitHandler<FormData> = async (values: FormData) => {
        let res = {userId: "", serverError: ""}
        if (authMode === "login") {
            res = await signInWithCredentials(values.email, values.password as any);
        } else if (authMode === "forgot") {
            await forgotPassword(values.email);
            setShowResetPasswordMessage(true);
            return;
        } else {
            res = await createAccountWithCredentials(values.email, values.password as any, values.firstname as string, values.lastname as string);
        }
        if (res) {
            if (res.serverError) {
                setShowServerError(true);
                setError("root", {message: res.serverError})
            } else {
                navigation.navigate("(tabs)" as never);
            }
        } else {
            setShowServerError(true);
            setError("root", {message: "Logging in failed. Try again."})
        }
    };

    // const handleProviderLogin = async () => {
    //     const res = await providerLogin()
    // }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const animateFields = (toValue: number) => {
        Animated.timing(firstnameOpacity, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();

        Animated.timing(lastnameOpacity, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const toggleAuthMode = () => {
        if (authMode === "login") {
            setAuthMode("signup");
            animateFields(1);
        } else {
            animateFields(0);
            setTimeout(() => setAuthMode("login"), 300);
        }
    };

    useEffect(() => {
        if (response?.type === "success") {
            console.log("Google Sign-In Success:", response.params);

            const { id_token } = response.params;
            providerLogin(id_token).then((result) => {
                if (result.serverError) {
                    console.log(result.serverError);
                    setIsLoadingProvider(false);
                } else {
                    console.log("User successfully signed in with ID:", result.userId);
                    navigation.navigate('(tabs)' as never)
                }
            });
        }
    }, [response]);
    

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setIsLoadingProvider(true);
        console.log("Triggering Google Sign-In...");

        await promptAsync();
        setLoading(false);
    };

    useEffect(() => {
        if (facebookResponse?.type === "success") {
            console.log("Facebook Sign-In Success:", facebookResponse.params);

            const { access_token } = facebookResponse.params;
            providerLogin(access_token).then((result) => {
                if (result.serverError) {
                    console.log(result.serverError);
                } else {
                    console.log("User successfully signed in with ID:", result.userId);
                    navigation.navigate('(tabs)' as never);
                }
                setIsLoadingProvider(false);
            });
        } else {
            setIsLoadingProvider(false);
        }
    }, [facebookResponse]);

    const handleFacebookSignIn = async () => {
        setLoading(true);
        console.log("Triggering Facebook Sign-In...");

        await promptFacebookAsync();
        setLoading(false);
    };

    return (
        <View className="w-full h-full flex-row items-center justify-center">
            <View className="w-full px-8">
                {authMode === "forgot" && <Button 
                variant="link"
                onPress={() => setAuthMode("login")}
                className='w-auto text-white mr-auto mb-10'
                iconLeft={<Icons.Arrow.Left size={18} color="black" />}
                >
                <Text variant='button-text' style={{color: "black"}}>Back</Text>
                </Button>}
                <Text className="text-5xl font-manrope-bold" color="deepBlue">{authMode === "login" ? "Welcome Back," : authMode === "signup" ? "Create Account" : "Forgot Password"}</Text>
                <Text variant="caption-1">{authMode === "login" ? "Login to your," : authMode === "signup" ? "Create a new" : "Enter your email to change password to your"} <Text variant="caption-1" className="font-Manrope-semiBold"> BlaccBook </Text> account</Text>

                <KeyboardAvoidingView behavior="padding">
                    <View className="pt-12">
                        {authMode === "signup" ?
                        <>
                            <Animated.View style={{ opacity: firstnameOpacity }}>
                                <Controller 
                                    control={control}
                                    name="firstname"
                                    render={({field: {onChange, value}}) => (
                                    <Input 
                                        label="First Name"
                                        placeholder="Jacob"
                                        textContentType="givenName"
                                        errorMessage={errors?.firstname?.message}
                                        value={(value as string).trim()}
                                        onChangeText={onChange}
                                        {...register("firstname")}/>
                                    )}
                                />
                            </Animated.View>
                            <Animated.View style={{ opacity: lastnameOpacity }}>
                                <Controller 
                                    control={control}
                                    name="lastname"
                                    render={({field: {onChange, value}}) => (
                                    <Input 
                                        label="Last Name"
                                        placeholder="Heally"
                                        textContentType="name"
                                        value={(value as string).trim()}
                                        onChangeText={onChange}
                                        errorMessage={errors?.lastname?.message}
                                        {...register("lastname")}/>
                                    )}
                                />
                            </Animated.View>
                        </> : null}
                        <Controller 
                            control={control}
                            name="email"
                            render={({field: {onChange, value}}) => (
                            <Input 
                                label="Email"
                                placeholder="example@email.com"
                                autoCapitalize="none"
                                autoCorrect={false}
                                errorMessage={errors?.email?.message}
                                value={value}
                                onChangeText={onChange}
                                {...register("email")}/>
                            )}
                        />
                        {authMode !== "forgot" && <Controller 
                            control={control}
                            name="password"
                            render={({field: {onChange, value}}) => (
                            <Input 
                                label="Password"
                                placeholder="********"
                                textContentType="password"
                                autoCapitalize="none"
                                value={value as any}
                                onChangeText={onChange}
                                errorMessage={errors?.password?.message}
                                secureTextEntry={!showPassword}
                                onToggleSecureContentVisibility={togglePasswordVisibility}
                                {...register("password")}/>
                            )}
                        />}
                        {authMode !== "forgot" && <Button 
                        variant="link" 
                        size="md" 
                        className="ml-auto mr-0 w-auto mb-6"
                        onPress={() => setAuthMode("forgot")}>Forgot Password</Button>}
                        <Button 
                            onPress={!isSubmitting ? handleSubmit(handleCredentialsLogin) : null}>{isSubmitting ? <ActivityIndicator size="small" /> : authMode === "login" ? "Login" : authMode === "forgot" ? "Submit" : "Sign Up"}</Button>

                        {/* <Text variant="headline" className="text-center mt-12">Or</Text>
                        <Text variant="caption-1" className="text-center mt-1">Sign in with</Text> */}
                        <Text variant="footnote" className="text-center my-5">Or</Text>
                        <Button
                        variant="secondary"
                        className="bg-transparent"
                        iconLeft={<Icons.Google.Colored size={26} />}
                        onPress={handleGoogleSignIn}>Google</Button>

                        <View 
                        // className="mt-6 flex-row items-center justify-center gap-6"
                        className="hidden"
                        >
                            <View className="border-t border-t-gray-300 w-12"></View>
                            <Button onPress={handleFacebookSignIn} variant="link" iconOnly={<Icons.Facebook.Colored size={26} />} className="w-auto" />
                            <Button onPress={handleGoogleSignIn} variant="link" iconOnly={<Icons.Google.Colored size={26} />} className="w-auto" />
                            <Button variant="link" iconOnly={<Icons.Apple.Colored size={26} />} className="w-auto" />
                            <View className="border-t border-t-gray-300 w-12"></View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
            <Text variant="footnote" className="absolute bottom-8">{authMode === "login" ? "Don't have an account?" : "Already have an account?"} <Text variant="footnote" color="deepBlue" className="font-Manrope-semiBold" onPress={toggleAuthMode}> {authMode === "login" ? "Sign Up" : "Login"}</Text></Text>

            <Alert 
                emoji="sad"
                heading="Oopsies. Failed to Authenticate!" 
                message={errors.root?.message as string} 
                isOpen={showServerError} 
                primaryButton={{title: "Ok", action: () => setShowServerError(false), type: "destructive"}} />

            <Alert 
                // emoji="sad"
                heading="Reset link sent!" 
                message="Kindly check your email for a password reset link" 
                isOpen={showResetPasswordMessage} 
                primaryButton={{title: "Ok", action: () => {setShowResetPasswordMessage(false); setAuthMode("login")}, type: "default"}} />

            
            {isLoadingProvider && <View className="w-full h-full flex-row items-center justify-center absolute top-0 z-50 bg-[#00000070]">
                <ActivityIndicator color="white" />
            </View>}
        </View>
    )
}

{/* <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        className="w-10 h-5 bg-black"
        style={{width: 400, height: 50}}
        // style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
          } catch (e) {
            if ((e as any).code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      /> */}

    //   const PersonalInfo = () => {

    //     const [loading, setLoading] = useState(false);
    
    //     const formSchema = z.object({
    //         email: z.string().email("Enter an valid email"),
    //         first_name: z.string().min(1, "First name is required"),
    //         last_name: z.string().min(1, "Last name is required"),
    //         city: z.string().optional(),
    //         country: z.string().optional(),
    //         postal_code: z.string().optional(),
    //         phone_number: z.string().min(5).max(20).optional()
    //     })
    
    //     type FormData = z.infer<typeof formSchema>
    
    //     const { 
    //         register, 
    //         formState:{errors, isSubmitting},
    //         control,
    //         handleSubmit,
    //         setError
    //     } = useForm<FormData>({
    //         defaultValues: {
    //             first_name: "",
    //             last_name: "",
    //             email: "",
    //             city: "",
    //             country: "",
    //             postal_code: "",
    //             phone_number: ""
    //         },
    //         resolver: zodResolver(formSchema)
    //     })
    
    //     return (
    //         <div>
    //             <div className="grid gap-8">
    //                 <div className="grid grid-cols-2 gap-5">
    //                 <Controller 
    //                     control={control}
    //                     name="first_name"
    //                     render={({field: {onChange, value}}) => (
    
    //                         <Input
    //                             label="First Name"
    //                             placeholder="Kwame"
    //                             type="text"
    //                             errorMessage={errors?.first_name?.message}
    //                             value={(value as string).trim()}
    //                             {...register("first_name")}
    //                             onChange={onChange}
    //                         />
    //                     )}
    //                 />
                        
                    
    //                 <Controller 
    //                     control={control}
    //                     name="last_name"
    //                     render={({field: {onChange, value}}) => (
    
    //                         <Input
    //                             label="Last Name"
    //                             placeholder="Ofori"
    //                             type="text"
    //                             errorMessage={errors?.last_name?.message}
    //                             value={(value as string).trim()}
    //                             {...register("last_name")}
    //                             onChange={onChange}
    //                         />
    //                     )}
    //                 />
    //                 </div>
    //                 <div className="grid grid-cols-2 gap-5">
    //                     <Controller 
    //                         control={control}
    //                         name="city"
    //                         render={({field: {onChange, value}}) => (
    
    //                             <Input
    //                                 label="City"
    //                                 placeholder="Accra"
    //                                 type="text"
    //                                 errorMessage={errors?.city?.message}
    //                                 value={(value as string).trim()}
    //                                 {...register("city")}
    //                                 onChange={onChange}
    //                             />
    //                         )}
    //                     />
    //                     <div className="grid grid-cols-2 gap-5">
    //                         <Controller 
    //                             control={control}
    //                             name="country"
    //                             render={({field: {onChange, value}}) => (
    
    //                                 <Input
    //                                     label="Country"
    //                                     placeholder="Ghana"
    //                                     type="text"
    //                                     errorMessage={errors?.country?.message}
    //                                     value={(value as string).trim()}
    //                                     {...register("country")}
    //                                     onChange={onChange}
    //                                 />
    //                             )}
    //                         />
                                
    //                         <Controller 
    //                             control={control}
    //                             name="postal_code"
    //                             render={({field: {onChange, value}}) => (
    
    //                                 <Input
    //                                     label="Postal Code"
    //                                     placeholder="0233"
    //                                     type="text"
    //                                     errorMessage={errors?.postal_code?.message}
    //                                     value={(value as string).trim()}
    //                                     {...register("postal_code")}
    //                                     onChange={onChange}
    //                                 />
    //                             )}
    //                         />
    //                     </div>
    //                 </div>
    //                 <div className="grid grid-cols-2 gap-5">
    //                     <Controller 
    //                         control={control}
    //                         name="phone_number"
    //                         render={({field: {onChange, value}}) => (
    
    //                             <Input
    //                                 label="Phone"
    //                                 placeholder="055 450 9087"
    //                                 type="tel"
    //                                 errorMessage={errors?.phone_number?.message}
    //                                 value={(value as string).trim()}
    //                                 {...register("phone_number")}
    //                                 onChange={onChange}
    //                             />
    //                         )}
    //                     />
    //                     <Controller 
    //                         control={control}
    //                         name="email"
    //                         render={({field: {onChange, value}}) => (
    
    //                             <Input
    //                                 label="Email"
    //                                 placeholder="example@email.com"
    //                                 type="tel"
    //                                 errorMessage={errors?.email?.message}
    //                                 value={(value as string).trim()}
    //                                 {...register("email")}
    //                                 onChange={onChange}
    //                             />
    //                         )}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }