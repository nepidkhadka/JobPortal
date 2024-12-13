import useGetAlljobs from "./hooks/useGetAlljobs";
import Search from "./sections/Search";
import FeaturedJobs from "@/sections/FeaturedJobs";

const Home = () => {
  useGetAlljobs();
  return (
    <>
      <Search />
      <FeaturedJobs />
    </>
  );
};

export default Home;
