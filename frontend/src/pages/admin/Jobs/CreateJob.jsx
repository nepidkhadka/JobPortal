import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCompaniesQuery } from "@/redux/api/companyApi";
import { usePostJobMutation } from "@/redux/api/jobsApi";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateJob = () => {
  const { user } = useSelector((store) => store.user);
  const { data } = useGetAllCompaniesQuery(user._id);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    locations: "",
    jobType: "",
    experience: "",
    positions: 0,
    companyId: "",
  });

  const nav = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };
  const [postjob, { isLoading: postJobLoading }] = usePostJobMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await postjob(input);

    if (res.data) {
      toast.error(res.data.message);
      nav("/admin/jobs");
    }
    if (res.error) {
      toast.error(res.error.data.message || "Something Went Wrong");
      return;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <p className="text-2xl font-semibold text-center my-6">Add New Job</p>
      <Button
        onClick={() => window.history.back()}
        variant="outline"
        className="mb-3"
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      {data && data.companies.length === 0 ? (
        <div className="mt-4">
          <span className="italic text-red-700">
            Please add company before posting job
          </span>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="border p-4 mt-4">
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="">
              <Label className="">Job Title :</Label>
              <Input
                onChange={handleInputChange}
                value={input.title}
                type="text"
                name="title"
                className="my-2 rounded-none"
                placeholder="Eg: Amazon"
              />
            </div>
            <div className="">
              <Label className="">Positions :</Label>
              <Input
                onChange={handleInputChange}
                value={input.positions}
                type="number"
                name="positions"
                className="my-2 rounded-none"
                placeholder="Eg: Amazon"
              />
            </div>
            <div className="">
              <Label className="">Requirements :</Label>
              <Input
                onChange={handleInputChange}
                value={input.requirements}
                type="text"
                name="requirements"
                className="my-2 rounded-none"
                placeholder="Eg: HTML, CSS, JS"
              />
            </div>
            <div className="">
              <Label className="">Salary :</Label>
              <Input
                onChange={handleInputChange}
                value={input.salary}
                type="text"
                name="salary"
                className="my-2 rounded-none"
                placeholder="Eg: 120k PA"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="">Job Type :</Label>
              <Select
                onValueChange={(value) => handleSelectChange("jobType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FullTime">Fulltime</SelectItem>
                  <SelectItem value="PartTime">PartTime</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label className="">Experience Level :</Label>
              <Input
                onChange={handleInputChange}
                value={input.experience}
                type="text"
                name="experience"
                className="my-2 rounded-none"
                placeholder="Eg: 1 Year"
              />
            </div>
            <div className="">
              <Label className="">Locations :</Label>
              <Input
                onChange={handleInputChange}
                value={input.locations}
                type="text"
                name="locations"
                className="my-2 rounded-none"
                placeholder="Eg: Kathmandu, Nepal"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="">Company :</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("companyId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {data &&
                    data.companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col col-span-2">
              <Label className="">Description :</Label>
              <textarea
                onChange={handleInputChange}
                value={input.description}
                type="text"
                cols={30}
                name="description"
                className="mt-4 border p-2 w-full rounded-none resize-y focus:outline-0"
                placeholder="Job Description"
              />
            </div>
          </div>
          <Button disabled={postJobLoading} className="mt-4 w-full">
            {postJobLoading ? "Posting..." : "Post Job"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CreateJob;
