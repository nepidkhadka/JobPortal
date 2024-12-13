import React from "react";
import logo from "@/assets/company1.png";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const JobCards = ({ jobs }) => {
  const daysAgo = (datetime) => {
    const createdAt = new Date(datetime);
    const currentTime = new Date();
    const differenceTime = currentTime - createdAt;
    return Math.floor(differenceTime / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="border flex flex-col gap-2 p-3 md:p-[20px] rounded-md shadow-lg shadow-gray-400 bg-white h-max">
      <div className="upperpart flex justify-between items-center">
        <div className="flex-grow">
          <p className="font-bold text-primary text-xl">{jobs?.title}</p>
          <p className="text-black/70  ">{jobs?.locations}</p>
        </div>
        <span className="mt-[-20px] text-black/70  ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="inline mb-0.5 mr-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
          </svg>
          {daysAgo(jobs?.createdAt) === 0
            ? "Today"
            : `${daysAgo(jobs?.createdAt)} Days Ago`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={"text-black/60 p-2 "} variant="outline">
          #{jobs?.positions}
        </Badge>
        <Badge className={"text-black/60 p-2 "} variant="outline">
          #{jobs?.jobType}
        </Badge>
        <Badge className={"text-black/60 p-2 "} variant="outline">
          #{jobs?.salary}LPA
        </Badge>
      </div>
      <div className="lowerpart border-t-2 mt-1">
        <p className="mt-4 text-sm text-black/90 ">{jobs?.description}</p>
        <div className="company flex justify-start items-center mt-4 mb-3">
          {/* <img className="p-0" src={logo} width="25" alt="Software Engineer" /> */}
          <p className="text-sm text-black font-medium ml-1 ">
            {jobs?.company.name}
          </p>
        </div>
      </div>

      <Link
        to={`/job/${jobs?._id}`}
        className="border-[1px] border-primary mt-2 font-medium rounded-[10px] p-3 w-full hover:bg-primary bg-transparent text-primary hover:text-white flex gap-1 justify-center items-center"
      >
        View More
        <ArrowRight />
      </Link>
    </div>
  );
};

export default JobCards;
