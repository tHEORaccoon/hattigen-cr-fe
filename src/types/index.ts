// ✅ Authentication State
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

// ✅ Personal Info State
export interface PersonalInfoState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

// ✅ Languages State
export interface LanguagesState {
  selectedLanguages: string[];
}

// ✅ Frameworks State
export interface FrameworksState {
  selectedFrameworks: string[];
}

// ✅ Databases State
export interface DatabasesState {
  selectedDatabases: string[];
}

// ✅ Cloud Platforms State
export interface CloudPlatformsState {
  selectedCloudPlatforms: string[];
}

// ✅ AI Tools State
export interface AIState {
  selectedAITools: string[];
}

// ✅ Uploaded Documents State
export interface UploadDocsState {
  uploadedFiles: File[];
}

export type StepInfo = {
  step: string;
  totalSteps: number;
  currentStep: number;
  completedSteps: boolean[];
};

export type Step = {
  name: string;
  title: string;
  description: string;
};

export type Skill = {
  title: string;
  months_of_experience: number;
  category_id: number;
  skill_id: string;
};