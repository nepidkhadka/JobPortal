import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOutIcon, LucideMenu, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_URL } from "@/lib/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/userSlice";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [menuopen, setmenuOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      path: "/",
      active: true,
    },
    {
      title: "Listed jobs",
      path: "/listed-jobs",
      active: false,
    },
    {
      title: "Browse Jobs",
      path: "/browse-jobs",
      active: false,
    },
  ];

  // Handle Log Out
  const handleLogOut = async () => {
    try {
      const res = await axios.get(`${USER_API_URL}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        nav("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="w-full h-auto flex z-10">
          <div className="w-full flex items-center justify-between flex-wrap shadow-sm p-2">
            <div
              className="text-primary font-bold text-[28px] cursor-pointer"
              onClick={() => nav("/")}
            >
              Job<span className="text-primary/40">Portal</span>
            </div>
            <div
              onClick={() => setmenuOpen(!menuopen)}
              className="menu md:hidden"
            >
              <LucideMenu />
            </div>
            <div
              className={`${
                menuopen ? "flex border-t-[1px] md:border-0" : "hidden md:flex"
              } p-2 rounded md:rounded-none md:bg-transparent flex-col w-full md:w-auto  md:flex-row items-center gap-4`}
            >
              {user && user.role == "recruiter" ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-primary" : "text-black"
                      }  font-medium hover:text-primary/80 transition`
                    }
                    to="/admin/companies"
                  >
                    Companies
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-primary" : "text-black"
                      }  font-medium hover:text-primary/80 transition`
                    }
                    to="/admin/jobs"
                  >
                    Jobs
                  </NavLink>
                </>
              ) : (
                navLinks.map((navitems) => (
                  <NavLink
                    key={navitems.title}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-primary" : "text-black"
                      }  font-medium hover:text-primary/80 transition`
                    }
                    to={navitems.path}
                  >
                    {navitems.title}
                  </NavLink>
                ))
              )}

              {!user ? (
                <div className="flex gap-2">
                  <Button onClick={() => nav("/login")}>Log In</Button>
                  <Button onClick={() => nav("/signup")}>Sign Up</Button>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="md:ml-10">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto
                            ? user?.profile?.profilePhoto
                            : "https://avatars.githubusercontent.com/u/124599"
                        }
                        alt="User Photo"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto
                              ? user?.profile?.profilePhoto
                              : "https://avatars.githubusercontent.com/u/124599"
                          }
                          alt="User Photo"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-black">
                          {user.fullName}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-3 border-t gap-2 pt-2">
                      {user && user.role == "student" && (
                        <div className="flex items-center py-2 gap-2">
                          <User2 />
                          <Link
                            to={"/profile"}
                            className="hover:text-primary/80"
                          >
                            View Profile
                          </Link>
                        </div>
                      )}

                      <div className="flex items-center py-2 gap-2">
                        <LogOutIcon />
                        <Link
                          onClick={handleLogOut}
                          className="hover:text-primary/80"
                        >
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
