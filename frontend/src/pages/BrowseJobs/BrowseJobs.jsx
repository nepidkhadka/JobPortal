import JobCards from "@/components/JobCards";
import React from "react";

const jobsArray = [
  1, 2, 3, 243, 43, 7, 8, 8, 8, 8, 8, 8, 8, 88, 5, 5, 56, 56, 56,
];

const BrowseJobs = () => {
  return (
    <div className="py-8">
      <h2 className="text-xl text-gray-700 font-bold">
        Search Result ({jobsArray.length})
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-4">
        {jobsArray.length > 0 ? (
          jobsArray && jobsArray.map((jobs, i) => <JobCards key={i} />)
        ) : (
          <span>Job's Not Found</span>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
