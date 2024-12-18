import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const JobsTable = ({ data, search }) => {
  const jobs = data.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Table>
        <TableCaption>A list of your jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Positions</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Added</TableHead>
            {/* <TableHead>Updated</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs &&
            jobs.map((job, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell className="text-center">{job.positions}</TableCell>
                <TableCell className="text-center">
                  {job.applications.length}
                </TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                {/* <TableCell>{job.updatedAt?.split("T")[0]}</TableCell> */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreVertical />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/companies/${job._id}`}>Edit</Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to="/admin/delete-company">Delete</Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
