import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASEURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

export const applicationsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    credentials: "include",
    mode: "cors",
  }),
  reducerPath: "applicationsApi",
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    getApplicationsById: builder.query({
      query: (id) => `/application/${id}/applicants`,
      providesTags: ["Applications"],
      transformResponse: (response) => response.job.applications,
    }),
    updateApplication: builder.mutation({
      query: ({ id, data }) => ({
        url: `/application/status/${id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const { useGetApplicationsByIdQuery, useUpdateApplicationMutation } =
  applicationsApi;
