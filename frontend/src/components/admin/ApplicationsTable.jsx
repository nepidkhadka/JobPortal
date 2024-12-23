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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Check, MoreVertical, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUpdateApplicationMutation } from "@/redux/api/applicationsApi";
import { toast } from "sonner";

const ApplicationsTable = ({ data }) => {
  const [updateApplication] = useUpdateApplicationMutation();

  const handleStatusUpdate = (id, status) => {
    const toastId = toast.loading("Updating Status...");

    updateApplication({
      id: id,
      data: {
        status: status,
      },
    })
      .then((res) => {
        if (res.data?.success) {
          toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
          toast.error(res.error.data?.message || "An error occurred.", {
            id: toastId,
          });
        } else {
          toast.dismiss(toastId); // Ensure the toast is dismissed if there's no error or success
        }
      })
      .catch((error) => {
        toast.error("An unexpected error occurred.", { id: toastId });
        console.error(error);
        toast.dismiss(toastId); // Ensure the toast is dismissed in case of a catch block
      });
  };

  const handleAccept = (id) => {
    handleStatusUpdate(id, "accepted");
  };

  const handleReject = (id) => {
    handleStatusUpdate(id, "rejected");
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your applicants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((applications, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage
                      src={
                        applications?.applicant?.profile?.profilePhoto
                          ? applications?.applicant.profile.profilePhoto
                          : "https://avatars.githubusercontent.com/u/124599"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {applications?.applicant?.fullName}
                </TableCell>
                <TableCell>{applications?.applicant?.email}</TableCell>
                <TableCell>{applications?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {applications?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Link
                    className="flex items-center gap-2 text-primary underline"
                    target="_blank"
                    to={applications?.applicant?.profile.resume}
                  >
                    {applications?.applicant?.profile.resumeOriginalName
                      ? applications?.applicant?.profile.resumeOriginalName
                      : "Resume Not Found"}
                  </Link>
                </TableCell>
                <TableCell className="capitalize">
                  {applications?.status}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreVertical />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger className="flex items-center gap-2">
                            <Check />
                            Accept
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
                                  onClick={() => handleAccept(applications._id)}
                                  type="submit"
                                >
                                  Accept
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger className="flex items-center gap-2">
                            <UserX />
                            Decline
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
                                  onClick={() => handleReject(applications._id)}
                                  type="submit"
                                >
                                  Decline
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

export default ApplicationsTable;
