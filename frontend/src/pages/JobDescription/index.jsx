import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

const JobDescription = () => {
  const isApplied = true;

  return (
    <div className="py-2 md:py-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl text-black/80">
            FrontEnd Developer
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-primary p-2"} variant="outline">
              12 Position
            </Badge>
            <Badge className={"text-rose-700 p-2"} variant="outline">
              FullTime
            </Badge>
            <Badge className={"text-orange-500 p-2"} variant="outline">
              12LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`${
            isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-primary"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="font-semibold text-xl text-black/80 mt-6 border-t-2 py-4">
        Job Description
      </h2>
      <div>
        <h3 className="font-semibold my-2">
          Role:
          <span className="font-normal text-gray-700">Frontend Developer</span>
        </h3>
        <h3 className="font-semibold my-2">
          Location: <span className="font-normal text-gray-700">Kathmandu</span>
        </h3>
        <h3 className="font-semibold my-2">
          Description:
          <p className="font-normal text-gray-700 leading-7">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            dolore error aliquid eos maxime eius, exercitationem tenetur
            repellendus aperiam quidem porro explicabo soluta voluptates quo
            velit? Recusandae alias expedita veniam quasi repudiandae quod sunt
            veritatis sint rerum voluptatum aliquam, iure necessitatibus dolore
            nisi perspiciatis velit ipsum quas nulla cum voluptas?
          </p>
        </h3>
        <h3 className="font-semibold my-2">
          Experience:
          <span className="font-normal text-gray-700">2 Years</span>
        </h3>
        <h3 className="font-semibold my-2">
          Salary:
          <span className="font-normal text-gray-700">14LPA</span>
        </h3>
        <h3 className="font-semibold my-2">
          Total Openings/Applicants:
          <span className="font-normal text-gray-700">6</span>
        </h3>
        <h3 className="font-semibold my-2">
          Posted Date:
          <span className="font-normal text-gray-700">11-3-2024</span>
        </h3>
      </div>
    </div>
  );
};

export default JobDescription;
