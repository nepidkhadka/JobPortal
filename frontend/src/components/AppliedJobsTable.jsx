import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const AppliedJobsTable = ({ data }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((application, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {application.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>{application.job.title}</TableCell>
                <TableCell>{application.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`bg-primary text-white p-2 rounded-sm capitalize ${
                      application?.status === "accepted"
                        ? "bg-green-500"
                        : "" || application?.status === "rejected"
                        ? "bg-red-500"
                        : ""
                    } `}
                  >
                    {application.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
