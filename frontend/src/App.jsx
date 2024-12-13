import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Layout from "./layout";
import ListedJobs from "./pages/ListedJobs/ListedJobs";
import BrowseJobs from "./pages/BrowseJobs/BrowseJobs";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import Companies from "./pages/admin/Companies";
import Jobs from "./pages/admin/Jobs";
import CreateCompany from "./pages/admin/Companies/CreateCompany";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/listed-jobs"
          element={
            <Layout>
              <ListedJobs />
            </Layout>
          }
        />
        <Route
          path="/browse-jobs"
          element={
            <Layout>
              <BrowseJobs />
            </Layout>
          }
        />
        <Route
          path="/job/:id"
          element={
            <Layout>
              <JobDescription />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <Layout>
              <Companies />
            </Layout>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <Layout>
              <Jobs />
            </Layout>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <Layout>
              <CreateCompany />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
