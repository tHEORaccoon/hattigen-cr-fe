import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StepInfo = {
  step: string;
  totalSteps: number;
  currentStep: number;
  completedSteps: boolean[];
};

type Skill = {
  title: string;
  months_of_experience: number;
  category_id: number;
};

type MultiStepFormState = {
  stepInfo: StepInfo;
  skills: Skill[];
};

const initialState: MultiStepFormState = {
  stepInfo: {
    step: "",
    totalSteps: 5,  
    currentStep: 0,
    completedSteps: [],
  },
  skills: [],
};

const multiStepFormSlice = createSlice({
  name: "multiStepForm",
  initialState,
  reducers: {
    setStepInfo: (state, action: PayloadAction<StepInfo>) => {
      state.stepInfo = action.payload;
    },
    nextStep: (state) => {
      if (state.stepInfo.currentStep < state.stepInfo.totalSteps - 1) {
        state.stepInfo.currentStep += 1;
        state.stepInfo.completedSteps.push(true);
      }
    },
    previousStep: (state) => {
      if (state.stepInfo.currentStep > 0) {
        state.stepInfo.currentStep -= 1;
      }
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills = state.skills.filter((_, index) => index !== action.payload);
    },
  },
});

export const { setStepInfo, nextStep, previousStep, addSkill, removeSkill } = multiStepFormSlice.actions;
export default multiStepFormSlice.reducer;
