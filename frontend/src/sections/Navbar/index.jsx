import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOutIcon, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);

  const nav = useNavigate();

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

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="w-full h-[60px]  shadow-sm flex z-10">
          <div className="w-full flex items-center justify-between">
            <div
              className="text-primary font-bold text-[28px] cursor-pointer"
              onClick={() => nav("/")}
            >
              Job<span className="text-primary/40">Portal</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((navitems) => (
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
              ))}

              {!user ? (
                <div className="flex gap-2">
                  <Button onClick={() => nav("/login")}>Log In</Button>
                  <Button onClick={() => nav("/signup")}>Sign Up</Button>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="ml-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
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
                      <div className="flex items-center py-2 gap-2">
                        <User2 />
                        <Link to={"/profile"} className="hover:text-primary/80">
                          View Profile
                        </Link>
                      </div>
                      <div className="flex items-center py-2 gap-2">
                        <LogOutIcon />
                        <Link className="hover:text-primary/80">Log Out</Link>
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
