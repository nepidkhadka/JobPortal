import React from "react";
import FilterCard from "../../components/FilterCard";
import JobCards from "../../components/JobCards";

const Jobs = () => {
  const jobsArray = [1, 2, 3, 4, 5, 5, 6, 7, 8];
  // const jobsArray = [];

  return (
    <div className="flex flex-wrap md:flex-nowrap md:py-8 mb-6">
      <div className="w-full md:w-1/5">
        <FilterCard />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full h-[80vh] overflow-y-auto md:p-3">
        {jobsArray.length > 0 ? (
          jobsArray && jobsArray.map((jobs, i) => <JobCards key={i} />)
        ) : (
          <span>Job's Not Found</span>
        )}
      </div>
    </div>
  );
};

export default Jobs;
