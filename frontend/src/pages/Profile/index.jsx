import AppliedJobsTable from "@/components/AppliedJobsTable";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UpdateProfile from "@/components/UpdateProfile";
import { useGetAppliedApplicationsQuery } from "@/redux/api/applicationsApi";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.user);

  const { data, isLoading, error } = useGetAppliedApplicationsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-8">
      <div className="border p-4 rounded-md relative shadow-md">
        <div className="flex items-center gap-8 mb-4 flex-wrap sm:flex-nowrap">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={
                user?.profile?.profilePhoto
                  ? user?.profile?.profilePhoto
                  : "https://avatars.githubusercontent.com/u/124599"
              }
              alt={user?.fullName}
            />
          </Avatar>
          <div className="mr-8">
            <h2 className="font-bold">{user?.fullName}</h2>
            <p>{user?.profile?.bio}</p>
          </div>
        </div>
        <div className="absolute right-2 top-2">
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="border-t pt-4">
          <div className="flex items-center gap-3 mb-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex  items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <h2 className="font-semibold tracking-wider mb-2">Skills </h2>
          {/* {Array.from({ length: 5 }).map((_, index) => (
            <Badge variant="outline" key={index}>
              {index}
            </Badge>
          ))} */}
          {!user?.profile?.skills ? (
            <Badge variant="destructive" className="mr-2 cursor-pointer">
              Skills Not Added
            </Badge>
          ) : (
            user?.profile?.skills.map((skill, index) => (
              <Badge className="mr-2 cursor-pointer" key={index}>
                {skill}
              </Badge>
            ))
          )}
        </div>
        <div className="mt-4 border-t pt-4">
          <h2 className="font-semibold tracking-wider mb-2">Resume </h2>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className=" text-primary cursor-pointer hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <Badge variant="destructive" className="mr-2 cursor-pointer">
              Resume Not Added
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-6 border p-4 rounded-md relative shadow-md">
        <h2 className="font-semibold tracking-wider mb-2 text-lg">
          Applied Jobs{" "}
        </h2>
        <AppliedJobsTable data={data} />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
