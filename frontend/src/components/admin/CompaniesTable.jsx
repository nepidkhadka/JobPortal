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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/124599" />
                </Avatar>
              </TableCell>
              <TableCell>Amazon Pvt. Ltd.</TableCell>
              <TableCell>2024-12-09</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Link to="/admin/edit-company">Edit</Link>
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

export default CompaniesTable;
