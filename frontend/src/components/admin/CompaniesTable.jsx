import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit, MoreVertical, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useDeleteCompanyMutation } from "@/redux/api/companyApi";
import { toast } from "sonner";

const CompaniesTable = ({ data, search }) => {
  const companies = data.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const [deleteCompany, { isLoading }] = useDeleteCompanyMutation();

  const handleCompanyDelete = async (id) => {
    const toastId = toast.loading("Deleting Company...");

    deleteCompany(id)
      .then((res) => {
        if (res.data?.success) {
          toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        }
      })
      .catch((error) => {
        toast.error("An unexpected error occurred.", { id: toastId });
        console.error(error);
      });
  };

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
          {companies &&
            companies.map((company, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo
                          ? company.logo
                          : "https://avatars.githubusercontent.com/u/124599"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreVertical />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Link
                          className="flex items-center gap-2"
                          to={`/admin/companies/${company._id}`}
                        >
                          <Edit />
                          Edit
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger className="flex items-center gap-2">
                            <Trash2Icon />
                            Delete
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="outline">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  onClick={() =>
                                    handleCompanyDelete(company._id)
                                  }
                                  type="submit"
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Deleting..." : "Confirm"}
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
