import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    company: null,
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const { setSingleCompany, setCompany } = companySlice.actions;
export default companySlice.reducer;
