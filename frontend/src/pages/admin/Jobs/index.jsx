import JobsTable from "@/components/admin/JobsTable";
import { Button } from "@/components/ui/button";
import { useGetAdminJobsQuery } from "@/redux/api/jobsApi";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const nav = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { data, isLoading, error } = useGetAdminJobsQuery(user._id);
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <div className="flex justify-between">
        <input
          placeholder="Filter by Title & Company"
          className="outline-0 border rounded-sm p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            nav("/admin/jobs/create");
          }}
        >
          New Job
        </Button>
      </div>
      <div className="my-6">
        <JobsTable data={data.jobs} search={search} />
      </div>
    </div>
  );
};

export default Jobs;
