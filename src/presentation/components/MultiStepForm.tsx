import { Input } from "./base/TextInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "./Header";
import { Button } from "./base/Button";
import { Text } from "./base/Text";
import LivePreview from "./LivePreview";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/redux/store/store";
import { updateUserProfile } from "@/core/service";
import { useDispatch } from "react-redux";
import { setUser, User } from "@/core/redux/slice/authSlice";
import { setCategories } from "@/core/redux/slice/categorySlice";
import { getCategory } from "@/core/service";
import Select from "react-select";
import countryList from "react-select-country-list";
import { StepInfo } from "@/types";
import { CheckMark, Delete } from "@/assets";

type Skill = {
  title: string;
  months_of_experience: number;
  category_id: number;
  skill_id: string;
};

const MultiStepForm = ({
  stepInfo,
  setStepInfo,
  user,
}: {
  stepInfo: StepInfo;
  setStepInfo: (stepInfo: StepInfo) => void;
  user: User;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [steps, setSteps] = useState(user ? user.steps : []);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const toggleCategory = (category: any) => {
    setSteps((prev) =>
      prev.find(c => c.name === category.name)
        ? prev.filter((c) => c.name !== category.name)
        : [...prev, category]
    );

    dispatch(setUser({ ...user, steps: steps }));
  };

  const saveSkill = (skill: Skill) => {
    setSkills([...skills, skill]);
  };

  const formSchema = z.object({
    email: z.string().email("Enter an valid email"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    city: z.string().optional(),
    country: z.string().optional(),
    postal_code: z.string().optional(),
    phone_number: z.string().min(5).max(20).optional(),
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
    formState: { errors },
    control,
    handleSubmit,
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
    const completed =
      stepInfo.currentStep === stepInfo.completedSteps.length
        ? [...stepInfo.completedSteps, true]
        : stepInfo.completedSteps;
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
    dispatch(setUser({ ...user, steps: steps }));
    const payload: Record<string, any> = {};

    payload.current_step = stepInfo.currentStep + 1;
    payload.steps = steps;

    const isLastStep = stepInfo.currentStep === steps.length - 1;

    if (isLastStep) payload.onboarding_completed = true;

    if (stepInfo.currentStep === 0) {
      payload.city = values.city;
      payload.country = selectedCountry;
      payload.phone_number = values.phone_number;
    } else {
      payload.skills = skills.map((skill) => ({
        skill_id: "67bd7cce6115934c44ece7d3",
        months_of_experience: skill.months_of_experience,
      }));
    }

    try {
      const response = await updateUserProfile(payload);
      if (response.status === 200) {
        dispatch(setUser(response.data?.user));
        if (stepInfo.currentStep === stepInfo.totalSteps - 1) {
          navigate("/profile-page", { replace: true });

          return;
        }
      }
      next();
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

  const options = countryList().getData();
  const countryOptions = options.map((option: any) => ({
    value: option.label,
    label: option.label,
  }));

  const PersonalInfo = () => {
    return (
      <div className="grid gap-8">
        <div className="grid md:grid-cols-2 gap-4">
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
                readOnly
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
                readOnly
              />
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="country-select"
                  className="text-sm font-medium text-gray-700"
                >
                  <Text variant="label-text" color="black">
                    Country
                  </Text>
                </label>
                <Select
                  options={countryOptions}
                  {...field}
                  onChange={(selectedOption: any) => {
                    field.onChange(selectedOption?.value);
                    setSelectedCountry(selectedOption?.value || null);
                  }}
                  value={countryOptions.find(
                    (option: any) => option.value === field.value
                  )}
                  placeholder="Select Country"
                  isSearchable
                  styles={{
                    control: (styles: any) => ({
                      ...styles,
                      backgroundColor: "white",
                      border: "1px solid rgb(221, 226, 231)",
                      padding: "3px",
                      borderRadius: "0.575rem",
                      ":hover": {
                        border: "1px solid #E5E7EB",
                      },
                    }),
                  }}
                />
              </div>
            )}
          />
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
                className={`px-4 py-2 rounded-full transition-all font-medium ${
                  steps.find((s) => s.name === category.name)
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black border border-black"
                }`}
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
            {stepInfo.currentStep === 0 ? (
              <PersonalInfo />
            ) : stepInfo.currentStep === 1 ? (
              <CategorySection />
            ) : (
              <OtherSteps />
            )}
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
          {steps[steps.length - 1].name !== "categories" &&
          stepInfo.currentStep === steps.length - 1
            ? "Finish"
            : "Continue"}
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
