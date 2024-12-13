import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    allJobs: [],
    singleJob: null,
  },
  reducers: {
    // Actions or Functions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlljobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setLoading, setAlljobs, setSingleJob, singleJob } =
  jobSlice.actions;
export default jobSlice.reducer;
