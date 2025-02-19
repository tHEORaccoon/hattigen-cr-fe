import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileInfo {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

interface Language {
  languages: string;
  experience: number;
  
}

interface  FrameworkScreenProps {
  framework: string;
  experience: number;
}

interface DatabaseExperience {
  database: string;
  experience: number;
}

interface AIExperience {
  aiExp: string;
  experience: number;
}
interface CloudPlatformScreenProps {
  platform: string;
  experience: number;
}

interface FormState {
  ProfileInfoData: ProfileInfo;
  LanguageData: Language[];
  FrameworkData: FrameworkScreenProps[];
  DatabaseData: DatabaseExperience[];
  AIData: AIExperience[];
  CloudPlatformData: CloudPlatformScreenProps[]
}

const initialState: FormState = {
  ProfileInfoData: {
    firstname: "",
    lastname: "",
    city: "",
    country: "",
    postalCode: "",
    email: "",
    phone: "",
  },
  LanguageData: [],
  FrameworkData: [],
  DatabaseData: [],
  AIData: [],
  CloudPlatformData:[],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateProfileInfoData: (state, action: PayloadAction<ProfileInfo>) => {
      state.ProfileInfoData = { ...state.ProfileInfoData, ...action.payload };
    },
    updateLanguageData: (state, action: PayloadAction<Language[]>) => {
      state.LanguageData = action.payload;
    },
    updateFrameworkData: (state, action: PayloadAction<FrameworkScreenProps[]>) => {
      state.FrameworkData = action.payload;
    },
    updateDatabaseData: (state, action: PayloadAction<DatabaseExperience[]>) => {
      state.DatabaseData = action.payload;
    },
    updateAIData: (state, action: PayloadAction<AIExperience[]>) => {
      state.AIData = action.payload;
    },
    updateCloudPlatformData: (state, action: PayloadAction<CloudPlatformScreenProps[]>) => {
      state.CloudPlatformData = action.payload;
    },
  },
});

export const {
  updateProfileInfoData,
  updateLanguageData,
  updateFrameworkData,
  updateDatabaseData,
  updateAIData,
  updateCloudPlatformData
} = formSlice.actions;

export default formSlice.reducer;
