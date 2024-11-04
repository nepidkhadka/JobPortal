import {
  Cross,
  CrossIcon,
  EyeClosed,
  HomeIcon,
  LocateIcon,
  QuoteIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";

const Search = () => {
  return (
    <section className="home-section" id="search">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold leading-tight">
          Serach, Apply & <br />
          Get Your<span className="text-primary"> Dream Jobs</span>
        </h2>
        <p className="my-8 text-center text-black/75 text-lg">
          Connecting Talent with Opportunity: Your Gateway to the Perfect Job!
        </p>
        <form action="">
          <div className="bg-black/80 p-2 flex flex-wrap md:flex-nowrap w-full justify-between items-center rounded-lg md:rounded-full gap-3 shadow-lg shadow-grey-700 max-w-3xl mx-auto">
            <input
              className="bg-transparent w-full focus:outline-none font-medium p-4 text-white focus:text-white placeholder:text-white/85"
              placeholder="Search Your Dream Job..."
              type="text"
              name="jobtitle"
              autoFocus={true}
            />
            <button className="text-white bg-primary p-3 md:p-4 flex-grow text-xl rounded-full mx-auto text-center">
              <SearchIcon className="hidden mx-auto md:block" />
              <span className="md:hidden">Search</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
