import { Input } from "./base/TextInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "./Header";
// import { useMultiStepForm } from "../../core/hooks/useMultiSteoForm";
import { Button } from "./base/Button";
import CheckMark from "../../assets/check.svg";
import Delete from "../../assets/delete.svg";
import { Text } from "./base/Text";
import { StepInfo } from "../pages/SetupPage";
import LivePreview from "./LivePreview";

type Step = {
    name: string,
    title: string,
    description: string
}

type Skill = {
    title: string,
    months_of_experience: number,
    category_id: number
}

const steps: Step[] = [
    {
        name: "personal info",
        title: "Let’s start with your personal info",
        description: "Include your full name and at least one way for employers to reach you."
    },
    {
        name: "programming language",
        title: "Let’s add your languages",
        description: "Add every programming language you have ever worked with."
    },
    {
        name: "database",
        title: "Let’s add your databases",
        description: "Have you done any database work?. This is where you put them."
    }
];

const MultiStepForm = ({stepInfo, setStepInfo}: {stepInfo: StepInfo, setStepInfo: (stepInfo: StepInfo) => void}) => {
    const [skills, setSkills] = useState<Skill[]>([])
    const [isEditing, setIsEditing] = useState(false);


    const saveSkill = (skill: Skill) => {
        setSkills([...skills, skill]);
    }

    const formSchema = z.object({
        // ...(currentStep === 0 ? {
            email: z.string().email("Enter an valid email"),
            first_name: z.string().min(1, "First name is required"),
            last_name: z.string().min(1, "Last name is required"),
            city: z.string().optional(),
            country: z.string().optional(),
            postal_code: z.string().optional(),
            phone_number: z.string().min(5).max(20).optional(),
        // } : {}),
        ...(stepInfo.currentStep !== 0 ? {
            skill: z.string().min(1, "Enter a skill"),
            months: z.string().min(1, "Enter your months of experience")
        } : {})
    })

    type FormData = z.infer<typeof formSchema>

    const { 
        register, 
        // formState:{errors, isSubmitting},
        formState:{errors},
        control,
        handleSubmit,
        // setError,
        reset,
        clearErrors
    } = useForm<FormData>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            city: "",
            country: "",
            postal_code: "",
            phone_number: "",
            skill: "",
            months: ""
        },
        resolver: zodResolver(formSchema)
    });

    const restExcess = () => {
        setIsEditing(false);
        clearErrors();
    }

    const next = () => {
        if (stepInfo.currentStep === steps.length - 1) return;
        setStepInfo({...stepInfo, currentStep: stepInfo.currentStep + 1, completedSteps: [...stepInfo.completedSteps, true]})
        restExcess()
    }

    const previous = () => {
        if (stepInfo.currentStep < 1) return;
        setStepInfo({...stepInfo, currentStep: stepInfo.currentStep - 1})
        restExcess()
        
    }

    const handleSave:SubmitHandler<FormData> = async (values: FormData) => {
        console.log("Form fields: ", values);
        console.log("Current step", stepInfo.currentStep);
        if (stepInfo.currentStep > 0) {
            saveSkill({
                category_id: stepInfo.currentStep, 
                title: values.skill as string, 
                months_of_experience: values.months as number
            });

            reset({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                city: values.city,
                country: values.country,
                postal_code: values.postal_code,
                phone_number: values.phone_number, skill: '', months: '' }, { keepValues: false });

            return;
        }
        next();
    };

    const handleDeleteSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    }

    useEffect(() => {
        setStepInfo({
            step: "",
            totalSteps: steps.length,
            currentStep: 0, 
            completedSteps: []
        })
    }, [steps])

    const PersonalInfo = () => {
        return (
            <div>
                <div className="grid gap-8">
                    <div className="grid grid-cols-2 gap-5">
                    <Controller 
                        control={control}
                        name="first_name"
                        render={({field: {onChange, value}}) => (

                            <Input
                                label="First Name"
                                placeholder="Kwame"
                                type="text"
                                errorMessage={errors?.first_name?.message}
                                value={(value as string).trim()}
                                {...register("first_name")}
                                onChange={onChange}
                            />
                        )}
                    />
                        
                    
                    <Controller 
                        control={control}
                        name="last_name"
                        render={({field: {onChange, value}}) => (

                            <Input
                                label="Last Name"
                                placeholder="Ofori"
                                type="text"
                                errorMessage={errors?.last_name?.message}
                                value={(value as string).trim()}
                                {...register("last_name")}
                                onChange={onChange}
                            />
                        )}
                    />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Controller 
                            control={control}
                            name="city"
                            render={({field: {onChange, value}}) => (

                                <Input
                                    label="City"
                                    placeholder="Accra"
                                    type="text"
                                    errorMessage={errors?.city?.message}
                                    value={(value as string).trim()}
                                    {...register("city")}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <div className="grid grid-cols-2 gap-5">
                            <Controller 
                                control={control}
                                name="country"
                                render={({field: {onChange, value}}) => (

                                    <Input
                                        label="Country"
                                        placeholder="Ghana"
                                        type="text"
                                        errorMessage={errors?.country?.message}
                                        value={(value as string).trim()}
                                        {...register("country")}
                                        onChange={onChange}
                                    />
                                )}
                            />
                                
                            <Controller 
                                control={control}
                                name="postal_code"
                                render={({field: {onChange, value}}) => (

                                    <Input
                                        label="Postal Code"
                                        placeholder="0233"
                                        type="text"
                                        errorMessage={errors?.postal_code?.message}
                                        value={(value as string).trim()}
                                        {...register("postal_code")}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Controller 
                            control={control}
                            name="phone_number"
                            render={({field: {onChange, value}}) => (

                                <Input
                                    label="Phone"
                                    placeholder="055 450 9087"
                                    type="tel"
                                    errorMessage={errors?.phone_number?.message}
                                    value={(value as string).trim()}
                                    {...register("phone_number")}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller 
                            control={control}
                            name="email"
                            render={({field: {onChange, value}}) => (

                                <Input
                                    label="Email"
                                    placeholder="example@email.com"
                                    type="tel"
                                    errorMessage={errors?.email?.message}
                                    value={(value as string).trim()}
                                    {...register("email")}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </div> 
        )
    }

    const OtherSteps = () => {
        return (
            <div>
                <div className="flex justify-between">
                    <div className="flex w-[calc(100%-60px)] justify-between">
                        <div className="w-[calc(60%-10px)]">
                            <Controller 
                                control={control}
                                name="skill"
                                render={({field: {onChange, value}}) => (

                                    <Input
                                        label={steps[stepInfo.currentStep].name}
                                        labelClasses="capitalize"
                                        placeholder="Type here..."
                                        type="text"
                                        errorMessage={errors?.skill?.message}
                                        value={(value as string).trim()}
                                        {...register("skill")}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-[calc(40%-10px)]">
                            <Controller 
                                control={control}
                                name="months"
                                render={({field: {onChange, value}}) => (

                                    <Input
                                        label="months of experience"
                                        labelClasses="capitalize"
                                        placeholder="12"
                                        type="number"
                                        errorMessage={errors?.months?.message}
                                        value={value as string}
                                        {...register("months")}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <button 
                        className="w-[40px] h-[40px] bg-primary rounded-full p-0 mt-6 flex active:bg-primary-dark"
                        onClick={handleSubmit(handleSave)}>
                        <img
                            src={CheckMark}
                            alt="Google Icon"
                            className="w-4 h-4 m-auto"
                        />
                    </button>
                </div>
                <div className="mt-10 flex gap-2">
                    {skills.filter(s => s.category_id === stepInfo.currentStep).map((s) => (
                        <button 
                            key={s.title}
                            className={`px-3 py-1 border border-[#75ACFF] bg-[#438EFF28] rounded-full flex gap-3 items-center ${isEditing && "animate-wiggle"}`}>
                            <Text className="font-semibold" color="blue">{s.title}</Text>
                            <Text className="font-semibold" color="blue">{s.months_of_experience}</Text>

                            {isEditing && (
                                <button
                                    onClick={() => handleDeleteSkill(skills.indexOf(s))}
                                    className="absolute right-0.5 top-1/9 -translate-y-1/2 translate-x-1/2 w-5 h-5 flex items-center justify-center bg-[#CCCCCC] text-white rounded-full shadow-md transition"
                                >
                                    <img src={Delete} alt="delete-icon" className="w-3 h-3" />
                                </button>
                            )}
                        </button>))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header
                title={steps[stepInfo.currentStep].title}
                description={steps[stepInfo.currentStep].description}
                isEditing={isEditing}
                setIsEditing={() => setIsEditing(!isEditing)} // Toggle edit mode
                hideEditButton={stepInfo.currentStep === 0 || skills.filter(s => s.category_id === stepInfo.currentStep).length === 0}
            />
            <div className="flex">
                <div className="w-3/5 pr-14">
                    <div className="mt-10">
                        {/* PERSONAL INFO FORM */}
                         {stepInfo.currentStep === 0 ? <PersonalInfo /> : <OtherSteps />}
                    </div>
                </div>

                <div className="w-2/5 pl-14">
                    <LivePreview />
                </div>
            </div>
            <div className="flex gap-5 md:justify-between w-full mt-20">
                {/* Back Button - Takes Space But Invisible When isFirstStep */}
                {stepInfo.currentStep === 0 ? <div></div> : <Button variant="outline" onClick={previous}>Back</Button>}

                {/* Continue Button - Always in the Same Position */}
                <Button onClick={stepInfo.currentStep === 0 ? handleSubmit(handleSave) : () => next()}>{stepInfo.currentStep === steps.length - 1 ? "Finish" : "Continue"}</Button>
            </div>

            <style>
                {`
                    @keyframes wiggle {
                        0% { transform: rotate(0deg); }
                        25% { transform: rotate(2deg); }
                        50% { transform: rotate(-2deg); }
                        75% { transform: rotate(2deg); }
                        100% { transform: rotate(0deg); }
                    }

                    .animate-wiggle {
                        animation: wiggle 0.4s infinite ease-in;
                    }
                `}
            </style>
        </div>
    )
}

export default MultiStepForm;