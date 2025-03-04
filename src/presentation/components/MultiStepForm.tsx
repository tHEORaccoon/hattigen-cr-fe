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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/redux/store/store"; // Import Redux types
import { updateUserProfile } from "@/core/service";
import { useDispatch } from "react-redux";
import { setUser, User } from "@/core/redux/slice/authSlice";
import { setCategories } from "@/core/redux/slice/categorySlice";
import { getCategory } from "@/core/service";

type Step = {
  name: string;
  title: string;
  description: string;
};

type Skill = {
  title: string;
  months_of_experience: number;
  category_id: number;
  skill_id: string;
};

// const steps: Step[] = [
//   {
//     name: "personal info",
//     title: "Let’s start with your personal info",
//     description: "Include your full name and at least one way for employers to reach you.",
//   },
//   {
//     name: "programming language",
//     title: "Select what categories you have experience in",
//     description: "You can choose only the categories you will like to edit",
//   },
//   {
//     name: "programming language",
//     title: "Let’s add your languages",
//     description: "Add every programming language you have ever worked with.",
//   },
//   {
//     name: "database",
//     title: "Let’s add your databases",
//     description:
//       "Have you done any database work?. This is where you put them.",
//   },
//   {
//     name: "cloud platforms",
//     title: "Let’s add your cloud platforms",
//     description:
//       "Have you worked with any cloud platforms?. This is where you put them.",
//   },
//   {
//     name: "AI experience",
//     title: "Do you have any AI experience?",
//     description: "Add any artifitial intelligence experience you have.",
//   },
// ];

// const categories = [
//     "Programming Languages",
//     "Databases",
//     "Frameworks",
//     "Tools",
//     "Skillsets",
//     "Cloud Platforms",
//     "AI Experience",
//     "Mobile Environments",
//     "E-Learning Tools",
//     "Spoken Languages",
//     "Office Tools",
//     "Project Management Tools",
//     "Roles",
//     "Business Intelligence",
//     "Reference Brands/Projects",
//   ];

  // const groupedCategories = [
  //   {
  //     name: "Programming Languages",
  //     slug: "programming-languages",
  //     title: "Let’s add your languages",
  //     description: "Add every programming language you have ever worked with.",
  //     sub_categories: ["HTML", "JAVA", "Python", "C++", "C#", "JavaScript"],
  //   },
  //   {
  //     name: "Spoken Languages",
  //     slug: "spoken-languages",
  //     title: "Let’s add your spoken languages",
  //     description: "Add every spoken language you have ever worked with.",
  //     sub_categories: ["TWI", "English"],
  //   },
  // ];

const MultiStepForm = ({
  stepInfo,
  setStepInfo,
  user
}: {
  stepInfo: StepInfo;
  setStepInfo: (stepInfo: StepInfo) => void;
  user: User
}) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Select user data from Redux store
  // const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [steps, setSteps] = useState(user ? user.steps : []);
  console.log(steps)

  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = useSelector((state: RootState) => state.category.categories);

  const toggleCategory = (category: any) => {
    // setSelectedCategories((prev) =>
    //   prev.includes(category)
    //     ? prev.filter((c) => c !== category)
    //     : [...prev, category]
    // );
    setSteps((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category])
    
    // console.log(steps);
    // setStepInfo({
    //   step: "",
    //   totalSteps: steps ? steps.length : 2,
    //   currentStep: user?.current_step || 0,
    //   completedSteps: stepInfo.completedSteps,
    // });
    dispatch(setUser({...user, steps: steps}));
    // console.log(user);
  };

  const saveSkill = (skill: Skill) => {
    setSkills([...skills, skill]);
  };

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
    ...(stepInfo.currentStep !== 0
      ? {
          skill: z.string().min(1, "Enter a skill"),
          months: z.string().min(1, "Enter your months of experience"),
        }
      : {}),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    // formState:{errors, isSubmitting},
    formState: { errors },
    control,
    handleSubmit,
    // setError,
    reset,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      city: user?.city ? user?.city : "",
      country: user?.country ? user?.country : "",
      postal_code: user?.postal_code ? user?.postal_code : "",
      phone_number: user?.phone_number ? user?.phone_number : "",
      skill: "",
      months: "",
    },
    resolver: zodResolver(formSchema),
  });

  const restExcess = () => {
    setIsEditing(false);
    clearErrors();
  };

  const next = () => {
    if (stepInfo.currentStep === steps.length - 1) return;
    const completed = stepInfo.currentStep === stepInfo.completedSteps.length ? [...stepInfo.completedSteps, true] : stepInfo.completedSteps;
    setStepInfo({
      ...stepInfo,
      currentStep: stepInfo.currentStep + 1,
      completedSteps: completed,
    });
    restExcess();
  };

  const previous = () => {
    if (stepInfo.currentStep < 1) return;
    setStepInfo({ ...stepInfo, currentStep: stepInfo.currentStep - 1 });
    restExcess();
  };

  const handleCreate: SubmitHandler<FormData> = async (values: FormData) => {
    if (stepInfo.currentStep > 0) {
      saveSkill({
        category_id: stepInfo.currentStep,
        skill_id: stepInfo.currentStep.toString(),
        title: values.skill as string,
        months_of_experience: Number(values.months),
      });

      reset(
        {
          ...values,
          skill: "",
          months: "",
        },
        { keepValues: false }
      );
    }
  };

  const handleSave = async (values: any) => {
    dispatch(setUser({...user, steps: steps}));
    // console.log(user)
    console.log(steps)
    // return;

    // Prepare the payload based on the step
    const payload: Record<string, any> = {};

    payload.current_step = stepInfo.currentStep + 1;
    payload.steps = steps;

    const isLastStep = stepInfo.currentStep === steps.length - 1;

    if (isLastStep) payload.onboarding_completed = true;

    // setStepInfo({
    //   step: "",
    //   totalSteps: steps ? steps.length : 2,
    //   currentStep: user?.current_step || 0,
    //   completedSteps: stepInfo.completedSteps,
    // });

    if (stepInfo.currentStep === 0) {
      payload.city = values.city;
      payload.country = values.country;
      payload.phone_number = values.phone_number;
    } else {
      // Other steps (Skills, Frameworks, etc.)
      payload.skills = skills.map((skill) => ({
        skill_id: "67bd7cce6115934c44ece7d3",
        months_of_experience: skill.months_of_experience,
      }));
    }

    try {
      const response = await updateUserProfile(payload); // Use the function instead of direct axios call
      if (response.status === 200) {
        
        dispatch(setUser(response.data?.user));
        if (stepInfo.currentStep === stepInfo.totalSteps - 1) {
          navigate("/profile-page", {replace: true});
          return;
        }
      }
      next(); // Move to the next step after saving
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response) {
        dispatch(setCategories(response.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setStepInfo({
      step: "",
      totalSteps: steps ? steps.length : 2,
      currentStep: user?.current_step || 0,
      completedSteps: stepInfo.completedSteps,
    });
  }, [steps]);

  const PersonalInfo = () => {
    return (
      <div>
        <div className="grid gap-8  ">
          <div className="grid md:grid-cols-2 gap-4 ">
            <Controller
              control={control}
              name="first_name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="First Name"
                  placeholder="Kwame"
                  type="text"
                  errorMessage={errors?.first_name?.message}
                  value={value as string}
                  {...register("first_name")}
                  onChange={onChange}
                  disabled
                />
              )}
            />

            <Controller
              control={control}
              name="last_name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Last Name"
                  placeholder="Ofori"
                  type="text"
                  errorMessage={errors?.last_name?.message}
                  value={value as string}
                  {...register("last_name")}
                  onChange={onChange}
                  disabled
                />
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
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
                render={({ field: { onChange, value } }) => (
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
                render={({ field: { onChange, value } }) => (
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
          <div className="grid md:grid-cols-2 gap-5">
            <Controller
              control={control}
              name="phone_number"
              render={({ field: { onChange, value } }) => (
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
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="example@email.com"
                  type="tel"
                  errorMessage={errors?.email?.message}
                  value={(value as string)?.trim()}
                  {...register("email")}
                  onChange={onChange}
                  disabled
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  };

  const CategorySection = () => {
    return (
        <div className="flex bg-black text-white">
        <div className="flex-1 bg-white text-black">
  
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full transition-all font-medium ${steps.find(s => s.name === category.name) ? "bg-black text-white" : "bg-gray-200 text-black border border-black"}`}
              >
                {category.name}
              </button>
            ))}
          </div>
  
        </div>
      </div>
    );
  };

  const OtherSteps = () => {
    return (
      <div>
        <div className="flex justify-between">
          <div className="flex w-[calc(100%-60px)] justify-between">
            <div className="w-[calc(60%-10px)]">
              <Controller
                control={control}
                name="skill"
                render={({ field: { onChange, value } }) => (
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
                render={({ field: { onChange, value } }) => (
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
            onClick={handleSubmit(handleCreate)}
          >
            <img src={CheckMark} alt="Google Icon" className="w-4 h-4 m-auto" />
          </button>
        </div>
        <div className="mt-10 flex gap-2">
          {skills
            .filter((s) => s.category_id === stepInfo.currentStep)
            .map((s) => (
              <button
                key={s.title}
                className={`px-3 py-1 border border-[#75ACFF] bg-[#438EFF28] rounded-full flex gap-3 items-center ${
                  isEditing && "animate-wiggle"
                }`}
              >
                <Text className="font-semibold" color="blue">
                  {s.title}
                </Text>
                <Text className="font-semibold" color="blue">
                  {s.months_of_experience}
                </Text>

                {isEditing && (
                  <button
                    onClick={() => handleDeleteSkill(skills.indexOf(s))}
                    className="absolute right-0.5 top-1/9 -translate-y-1/2 translate-x-1/2 w-5 h-5 flex items-center justify-center bg-[#CCCCCC] text-white rounded-full shadow-md transition"
                  >
                    <img src={Delete} alt="delete-icon" className="w-3 h-3" />
                  </button>
                )}
              </button>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header
        title={steps[stepInfo.currentStep].title}
        description={steps[stepInfo.currentStep].description}
        isEditing={isEditing}
        setIsEditing={() => setIsEditing(!isEditing)} // Toggle edit mode
        hideEditButton={
          stepInfo.currentStep === 0 ||
          skills.filter((s) => s.category_id === stepInfo.currentStep)
            .length === 0
        }
      />
      <div className="flex md:flex-row flex-col">
        <div className="w-full md:w-3/5 lg:pr-14 md:pr-8">
          <div className="mt-10">
            {/* PERSONAL INFO FORM */}
            {stepInfo.currentStep === 0 ? <PersonalInfo /> : stepInfo.currentStep === 1 ? <CategorySection/> : <OtherSteps />}
          </div>
        </div>

        <div className="hidden md:block md:w-2/5 pl-14 ">
          <LivePreview />
        </div>
      </div>
      <div className="flex gap-5 md:justify-between w-full mt-20">
        {/* Back Button - Takes Space But Invisible When isFirstStep */}
        {stepInfo.currentStep === 0 ? (
          <div></div>
        ) : (
          <Button variant="outline" onClick={previous}>
            Back
          </Button>
        )}

        {/* Continue Button - Always in the Same Position */}
        <Button
          onClick={
            stepInfo.currentStep === 0
              ? handleSubmit(handleSave)
              : () => handleSave("")
          }
        >
          {steps[steps.length - 1].name !== "categories" && stepInfo.currentStep === steps.length - 1 ? "Finish" : "Continue"}
        </Button>
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
  );
};

export default MultiStepForm;


