import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASEURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

export const jobsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    credentials: "include",
    mode: "cors",
  }),
  reducerPath: "jobsApi",
  tagTypes: ["jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/job/get",
      providesTags: ["jobs"],
    }),
    getAdminJobs: builder.query({
      query: () => "/job/getadminjobs",
      providesTags: ["adminjobs"],
    }),
    getJobsById: builder.query({
      query: (id) => `/job/get/${id}`,
      transformResponse: (response) => response.job,
      providesTags: ["jobs"],
    }),
    applyJob: builder.mutation({
      query: (id) => ({
        url: `/application/apply/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["jobs"],
    }),
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobsByIdQuery,
  useApplyJobMutation,
  useGetAdminJobsQuery,
  usePostJobMutation,
} = jobsApi;
