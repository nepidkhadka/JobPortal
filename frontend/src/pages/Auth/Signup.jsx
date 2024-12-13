import { USER_API_URL } from "@/lib/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("role", input.role);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.post(`${USER_API_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success === true) {
        nav("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-2xl mx-auto rounded-sm border p-8 my-16"
    >
      <h2 className="text-2xl font-medium mb-8 text-center">Sign Up</h2>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={input.email}
          onChange={handleInputChange}
          type="email"
          name="email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={input.password}
          onChange={handleInputChange}
          type="password"
          name="password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={input.fullName}
          onChange={handleInputChange}
          type="text"
          name="fullName"
          id="fullName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="fullName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={input.phoneNumber}
          onChange={handleInputChange}
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          name="phoneNumber"
          id="phoneNumber"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phoneNumber"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number (123-456-7890)
        </label>
      </div>
      <div className="md:flex justify-between flex-wrap">
        <div className="inline-flex items-center mr-4">
          <input
            onChange={handleInputChange}
            id="recruiter"
            type="radio"
            value="recruiter"
            name="role"
            checked={input.role === "recruiter"}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="recruiter"
            className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Recruiter
          </label>
        </div>
        <div className="inline-flex items-center">
          <input
            onChange={handleInputChange}
            id="student"
            type="radio"
            value="student"
            checked={input.role === "student"}
            name="role"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="student"
            className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            Student
          </label>
        </div>
        <div className="mt-4 md:mt-0">
          <label
            className="block text-sm mb-2 font-medium text-gray-500 dark:text-gray-400"
            htmlFor="file_input"
          >
            Profile
          </label>
          <input
            accept="image/*"
            name="file"
            onChange={handleFileChange}
            className="text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file"
            type="file"
          />
        </div>
      </div>
      {loading ? (
        <button
          title="Signing Up"
          disabled
          className="text-white bg-primary/80 mt-6 font-medium rounded-lg text-sm w-full py-2.5 cursor-not-allowed "
        >
          <Loader2 size={16} className="animate-spin inline mr-2" />
          Please Wait....
        </button>
      ) : (
        <button
          type="submit"
          className="text-white  bg-primary mt-6 hover:bg-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign up
        </button>
      )}
      {/* <button
        type="submit"
        className="text-white  bg-primary mt-6 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button> */}
      <span className="mt-4 block text-sm">
        Already Have An Account ?{" "}
        <Link to={"/login"} className="text-primary underline">
          Login
        </Link>
      </span>
    </form>
  );
};

export default Signup;
