import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_URL } from "@/lib/constant";
import { setUser } from "@/redux/userSlice";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: +user?.phoneNumber,
    bio: user?.profile.bio,
    skills: user?.profile.skills?.map((skills) => skills),
    file: user?.profile.resume,
  });

  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);
      formData.append("role", input.role);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.post(`${USER_API_URL}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success === true) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      toast.error(error.response.data.message);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-[400px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile by filling the below form.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name">Name</Label>
            <input
              className="p-1 w-full focus:outline-0 rounded"
              id="name"
              name="fullName"
              onChange={(e) => handleFormChange(e)}
              type="text"
              value={input.fullName}
              placeholder="Enter Your Name"
            />
            <Label htmlFor="email">Email</Label>
            <input
              className="p-1 w-full focus:outline-0 rounded"
              id="email"
              type="text"
              name="email"
              onChange={(e) => handleFormChange(e)}
              value={input.email}
              placeholder="Enter Your Email"
            />
            <Label htmlFor="number">Number</Label>
            <input
              className="p-1 w-full focus:outline-0 rounded"
              id="number"
              type="number"
              onChange={(e) => handleFormChange(e)}
              name="phoneNumber"
              value={input.phoneNumber}
              placeholder="Enter Your Number"
            />
            <Label htmlFor="bio">Bio</Label>
            <input
              className="p-1 w-full focus:outline-0 rounded"
              id="bio"
              value={input.bio}
              type="text"
              name="bio"
              onChange={(e) => handleFormChange(e)}
              placeholder="Enter Your Bio"
            />
            <Label htmlFor="skills">Skills</Label>
            <input
              className="p-1 w-full focus:outline-0 rounded"
              id="skills"
              type="text"
              value={input.skills}
              onChange={(e) => handleFormChange(e)}
              name="skills"
              placeholder="Enter Your Skills"
            />
            <Label htmlFor="file">Resume</Label>
            <input
              className="p-1 w-full focus:outline-0 rounded"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept="application/pdf"
              type="file"
            />
          </div>
          {loading ? (
            <DialogFooter>
              <button
                title="Logging In"
                disabled
                className="text-white bg-primary/80 mt-6 font-medium rounded-lg text-sm w-full py-2.5 cursor-not-allowed "
              >
                <Loader2 size={16} className="animate-spin inline mr-2" />
              </button>
            </DialogFooter>
          ) : (
            <DialogFooter>
              <button
                type="submit"
                className="text-white  bg-primary mt-6 hover:bg-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save Changes
              </button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
