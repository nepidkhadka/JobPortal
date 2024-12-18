import JobCards from "@/components/JobCards";
import { useGetJobsQuery } from "@/redux/api/jobsApi";
import React from "react";

const FeaturedJobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  const allJobs = data?.jobs || [];
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <section id="jobs-openings" className="home-section">
      <h2 className="text-2xl mb-6 font-bold uppercase inline-block text-primary relative before:absolute before:left-0 before:bottom-[-8px] before:h-1 before:bg-primary/20 before:w-full before:rounded-sm">
        Latest <span className="text-primary/40">Jobs</span>
      </h2>
      {/* Job Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-10 py-5">
        {allJobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <JobCards key={job._id} jobs={job} />)
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
