import React from "react";
import FilterCard from "../../components/FilterCard";
import JobCards from "../../components/JobCards";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  const allJobs = data?.jobs || [];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap md:py-8 mb-6">
      <div className="w-full md:w-1/5">
        <FilterCard />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full h-[80vh] overflow-y-auto md:p-3">
        {allJobs.length > 0 ? (
          allJobs && allJobs.map((jobs, i) => <JobCards key={i} jobs={jobs} />)
        ) : (
          <span>Job's Not Found</span>
        )}
      </div>
    </div>
  );
};

export default Jobs;
