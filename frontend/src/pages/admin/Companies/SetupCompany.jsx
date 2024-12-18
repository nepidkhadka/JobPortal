import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "@/redux/api/companyApi";
import { setSingleCompany } from "@/redux/slices/companySlice";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const SetupCompany = () => {
  const params = useParams();
  const nav = useNavigate();
  const {
    data: singleCompany,
    isError,
    error,
    isLoading: singleCompanyLoading,
  } = useGetCompanyByIdQuery(params.id);
  console.log(singleCompany);

  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    locations: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        locations: singleCompany.locations || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const fromdata = new FormData();
    fromdata.append("name", input.name);
    fromdata.append("description", input.description);
    fromdata.append("website", input.website);
    fromdata.append("locations", input.locations);
    if (input.file) {
      fromdata.append("file", input.file);
    }

    const res = await updateCompany({ id: params.id, data: fromdata });
    if (res.data) {
      toast.error(res.data.message);
      nav("/admin/companies");
    }
    if (res.error) {
      toast.error(res.error.data.message || "Something Went Wrong");
      return;
    }
  };

  if (singleCompanyLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="">
        <p className="text-2xl font-semibold text-center my-6">
          Setup/Update Company
        </p>
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="mb-3"
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <form onSubmit={handleFormSubmit} className="border p-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Label className="">Company Name :</Label>
              <Input
                onChange={handleInputChange}
                value={input.name}
                type="text"
                name="name"
                className="my-2 rounded-none"
                placeholder="Eg: Amazon"
              />
            </div>
            <div className="">
              <Label className="">Company Website :</Label>
              <Input
                onChange={handleInputChange}
                value={input.website}
                type="text"
                name="website"
                className="my-2 rounded-none"
                placeholder="Eg. mywebsite.com"
              />
            </div>
            <div className="">
              <Label className="">Location :</Label>
              <Input
                onChange={handleInputChange}
                value={input.locations}
                type="text"
                name="locations"
                className="my-2 rounded-none"
                placeholder="Eg. Kathmandu, Nepal"
              />
            </div>
            <div className="">
              <Label className="">Company Logo :</Label>
              <Input
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                className="my-2 rounded-none"
              />
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
                placeholder="Company Short Description"
              />
            </div>
          </div>
          <div className="flex">
            {isLoading ? (
              <Button disabled className="mt-4">
                Updating
              </Button>
            ) : (
              <Button className="mt-4">Update</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupCompany;
