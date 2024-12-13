import { useSelector } from "react-redux";
import Search from "./sections/Search";
import FeaturedJobs from "@/sections/FeaturedJobs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user } = useSelector((store) => store.user);

  const nav = useNavigate();

  useEffect(() => {
    if (user && user?.role === "recruiter") return nav("/admin/jobs");
  }, [user]);

  return (
    <>
      <Search />
      <FeaturedJobs />
    </>
  );
};

export default Home;
