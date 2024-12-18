import CompaniesTable from "@/components/admin/CompaniesTable";
import { Button } from "@/components/ui/button";
import { useGetAllCompaniesQuery } from "@/redux/api/companyApi";
import React, { useState } from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const nav = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { data, isError, isLoading, error } = useGetAllCompaniesQuery(user._id);
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <div className="flex justify-between">
        <input
          placeholder="Filter by Name"
          className="outline-0 border rounded-sm p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            nav("/admin/companies/create");
          }}
        >
          New Company
        </Button>
      </div>
      <div className="my-6">
        <CompaniesTable data={data.companies} search={search} />
      </div>
    </div>
  );
};

export default Companies;
