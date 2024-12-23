import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import jobSlice from "./slices/jobSlice";
import companySlice from "./slices/companySlice";
import { jobsApi } from "./api/jobsApi";
import { companyApi } from "./api/companyApi";
import { applicationsApi } from "./api/applicationsApi";

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    company: companySlice,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(companyApi.middleware)
      .concat(applicationsApi.middleware),
});

export default store;
