import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CreateCompany = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="">
        <h1 className="text-2xl font-semibold mt-2">Add New Company</h1>

        <form action="" className="border p-4 mt-4">
          <div className="">
            <Label className="">Enter Company Name :</Label>
            <Input
              type="text"
              className="my-2 rounded-none"
              placeholder="Eg: Amazon"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="mt-4">
              Cancel
            </Button>
            <Button className="mt-4">Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
