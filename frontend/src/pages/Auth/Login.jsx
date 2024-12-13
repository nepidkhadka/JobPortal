import { USER_API_URL } from "@/lib/constant";
import { setLoading, setUser } from "@/redux/slices/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_URL}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success === true) {
        dispatch(setUser(res.data.user));
        nav("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-2xl mx-auto rounded-sm border p-8 mt-20"
    >
      <h2 className="text-2xl font-medium mb-8 text-center">Log In</h2>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={input.email}
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
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
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
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
      {loading ? (
        <button
          title="Logging In"
          disabled
          className="text-white bg-primary/80 mt-6 font-medium rounded-lg text-sm w-full py-2.5 cursor-not-allowed "
        >
          <Loader2 size={16} className="animate-spin inline mr-2" />
        </button>
      ) : (
        <button
          type="submit"
          className="text-white  bg-primary mt-6 hover:bg-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      )}

      <span className="mt-4 block text-sm">
        Dont Have An Account ?{" "}
        <Link to={"/signup"} className="text-primary underline">
          Sign Up
        </Link>
      </span>
    </form>
  );
};

export default Login;
