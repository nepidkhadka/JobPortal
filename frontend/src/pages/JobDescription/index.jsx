import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPLICATION_API_URL } from "@/lib/constant";
import { useApplyJobMutation, useGetJobsByIdQuery } from "@/redux/api/jobsApi";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const { id } = useParams();
  const { data: singleJob, isLoading, isError } = useGetJobsByIdQuery(id);
  const [applyJob] = useApplyJobMutation();

  const { user } = useSelector((store) => store.user);
  const isApplied =
    singleJob?.applications?.find(
      (application) => application.applicant === user?._id
    ) || false;

  const handleApplyJob = async () => {
    try {
      // const res = await axios.get(`${APPLICATION_API_URL}/apply/${id}`, {
      //   withCredentials: true,
      // });
      const res = await applyJob(id);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something Went Wrong</div>;
  }

  return (
    <div className="py-2 md:py-8">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h1 className="font-bold text-3xl text-black/80">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-primary p-2"} variant="outline">
              {singleJob?.positions} Position
            </Badge>
            <Badge className={"text-rose-700 p-2"} variant="outline">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-orange-500 p-2"} variant="outline">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        {!user ? (
          <Link className="underline text-primary" to="/login">
            Login To Apply
          </Link>
        ) : (
          <Button
            onClick={isApplied ? null : handleApplyJob}
            disabled={isApplied}
            className={`${
              isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-primary"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        )}
      </div>
      <h2 className="font-semibold text-xl text-black/80 mt-6 border-t-2 py-4">
        Job Description
      </h2>
      <div>
        <h3 className="font-bold my-3">
          Role:{" "}
          <span className="font-medium text-lg text-gray-700">
            {singleJob?.title}
          </span>
        </h3>
        <h3 className="font-bold my-3">
          Location:{" "}
          <span className="font-medium text-lg text-gray-700">
            {singleJob?.locations}
          </span>
        </h3>
        <h3 className="font-bold my-3">
          Description:{" "}
          <p className="font-medium text-lg text-gray-700 leading-7">
            {singleJob?.description}
          </p>
        </h3>
        <h3 className="font-bold my-3">
          Experience:{" "}
          <span className="font-medium text-lg text-gray-700">
            {singleJob?.experienceLevel} Years
          </span>
        </h3>
        <h3 className="font-bold my-3">
          Salary:{" "}
          <span className="font-medium text-lg text-gray-700">
            {singleJob?.salary}LPA
          </span>
        </h3>
        <h3 className="font-bold my-3">
          Total Applicants:{" "}
          <span className="font-medium text-lg text-gray-700">
            {singleJob?.applications?.length}
          </span>
        </h3>
        <h3 className="font-bold my-3">
          Posted Date:{" "}
          <span className="font-medium text-lg text-gray-700">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default JobDescription;
