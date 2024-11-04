import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Lalitpur", "Kathmandu", "Bhaktapur", "Pokhara", "Biratnagar"],
    },
    {
      filterType: "Salary",
      array: ["0-40K", "41-100K", "100-300K", "300-500K"],
    },
    {
      filterType: "Industry",
      array: [
        "IT",
        "Management",
        "Graphic Designing",
        "Content Writing",
        "Digital Marketing",
      ],
    },
  ];

  return (
    <div className="p-3 rounded-md w-full">
      <h2 className="font-bold text-xl text-primary">Filter Jobs</h2>
      <hr className="my-4" />
      <div className="flex justify-between md:block">
        {filterData.map((filter, i) => (
          <div key={filter.filterType} className="mb-4">
            <h3 className="mb-2 font-bold">{filter.filterType}</h3>
            <RadioGroup>
              {filter.array.map((item, i) => (
                <div key={item} className="flex items-center space-x-3 mb-1">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
