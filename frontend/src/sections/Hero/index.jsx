import bg from "@/assets/backgrounds/bg.jpg";

const Hero = () => {
  return (
    <div
      className="w-full h-[80vh] flex items-center px-5 md:px-24 bg-cover bg-no-repeat bg-center relative justify-center md:justify-between"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col gap-8 z-50">
        <span className="text-6xl font-semibold text-indigo-100">
          Job Portal
        </span>
        <p className="text-gray-200 max-w-[600px] leading-7">
          Your ultimate destination for discovering job opportunities tailored
          to your skills and preferences. With a user-friendly interface and
          advanced search capabilities, JobHunt connects job seekers with
          employers efficiently, making the job search process smooth and
          successful. Start your career journey with JobHunt today!
        </p>
        <button className="text-white bg-indigo-500 w-44 p-4 rounded-full">
          Explore Jobs
        </button>
      </div>
      <div className="w-full h-[calc(80vh)] bg-indigo-900 opacity-60 absolute left-0"></div>
    </div>
  );
};

export default Hero;
