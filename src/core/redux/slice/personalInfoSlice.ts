import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfoState {
  firstName: string;
  lastName: string;
  email: string;
  city:string;
  country:string;
  phone:string;
}

const initialState: PersonalInfoState = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: "",
  country: ""
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    updatePersonalField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      (state as any)[action.payload.field] = action.payload.value;
    },

  },
});

export const { setPersonalInfo, updatePersonalField } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
