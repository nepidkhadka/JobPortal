import JobCards from "@/components/JobCards";
import { useSearchJobsQuery } from "@/redux/api/jobsApi";
import React from "react";
import { useSearchParams } from "react-router-dom";

const BrowseJobs = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("keyword");

  const { data, error, isLoading } = useSearchJobsQuery(search);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-8">
      <h2 className="text-xl text-gray-700 font-bold">
        Search Result ({data.length})
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-4">
        {data.length > 0 ? (
          data && data.map((jobs, i) => <JobCards jobs={jobs} key={i} />)
        ) : (
          <span>Job's Not Found</span>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
