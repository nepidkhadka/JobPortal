// import { JOB_API_URL } from "@/lib/constant";
// import { setAlljobs } from "@/redux/slices/jobSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetAlljobs = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_URL}/get`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setAlljobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllJobs();
//   }, []);
// };

// export default useGetAlljobs;
