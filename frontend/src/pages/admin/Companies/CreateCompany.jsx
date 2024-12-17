import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterCompanyMutation } from "@/redux/api/companyApi";
import { setSingleCompany } from "@/redux/slices/companySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCompany = () => {
  const nav = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const [registerCompany, { data, error, isError, isLoading, isSuccess }] =
    useRegisterCompanyMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSingleCompany(data.company));
      toast.success(data.message);
      setCompanyName("");
      nav(`/admin/companies/${data.company._id}`);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error, isError, isSuccess]);

  const handleCompanySubmit = async (e) => {
    e.preventDefault();

    if (!companyName) {
      toast.error("Company name is required!");
      return;
    }
    await registerCompany({ companyName });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="">
        <h1 className="text-2xl font-semibold mt-2">Add New Company</h1>

        <form onSubmit={handleCompanySubmit} className="border p-4 mt-4">
          <div className="">
            <Label className="">Enter Company Name :</Label>
            <Input
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              type="text"
              className="my-2 rounded-none"
              placeholder="Eg: Amazon"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => nav("/admin/companies")}
              variant="outline"
              className="mt-4"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              // onClick={() => ()registerCompany({ registerCompany: companyName })}
              onClick={(e) => handleCompanySubmit(e)}
              className="mt-4"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
