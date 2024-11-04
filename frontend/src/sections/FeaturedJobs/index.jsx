import JobCards from "@/components/JobCards";
import React from "react";

const FeaturedJobs = () => {
  let jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section id="jobs-openings" className="home-section">
      <h2 className="text-2xl mb-6 font-bold uppercase inline-block text-primary relative before:absolute before:left-0 before:bottom-[-8px] before:h-1 before:bg-primary/20 before:w-full before:rounded-sm">
        Latest <span className="text-primary/40">Jobs</span>
      </h2>
      {/* Job Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 py-5">
        {jobs.slice(0, 8).map((job) => (
          <JobCards key={job} jobs={job} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
