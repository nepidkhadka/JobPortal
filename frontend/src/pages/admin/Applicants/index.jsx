import ApplicationsTable from "@/components/admin/ApplicationsTable";
import { useGetApplicationsByIdQuery } from "@/redux/api/applicationsApi";
import React from "react";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const params = useParams();

  const { data, isLoading, error } = useGetApplicationsByIdQuery(params.id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto pt-6">
      <h1 className="font-bold mb-6">Applicants ({data?.length})</h1>
      <ApplicationsTable data={data} />
    </div>
  );
};

export default Applicants;
