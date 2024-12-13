import CompaniesTable from "@/components/admin/CompaniesTable";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const nav = useNavigate();

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <div className="flex justify-between">
        <input
          placeholder="Filter by Name"
          className="outline-0 border rounded-sm p-2"
        />
        <Button
          onClick={() => {
            nav("/admin/companies/create");
          }}
        >
          New Company
        </Button>
      </div>
      <div className="mt-6">
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
