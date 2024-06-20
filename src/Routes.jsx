import { BrowserRouter } from "react-router-dom";
import { Login } from "./Components/Pages/Login";
import { Dashboard } from "./Components/Pages/Dashboard";
import { NewJob } from "./Components/NavlinkPages/NewJob";
import { ManageJobs } from "./Components/NavlinkPages/ManageJobs";
import { MyProfile } from "./Components/NavlinkPages/MyProfile";
import { Register } from "./Components/Pages/Register";
import { AllApplicants } from "./Components/NavlinkPages/AllApplicants";
import { Shortlisted } from "./Components/NavlinkPages/Shortlisted";
import { Settings } from "./Components/NavlinkPages/Settings";

export const routes = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "newjob", element: <NewJob /> },
      { path: "managejob", element: <ManageJobs /> },
      { path: "myprofile", element: <MyProfile /> },
      { path: "allaplicants", element: <AllApplicants /> },
      { path: "shortlisted", element: <Shortlisted/> },
      { path: "settings", element: <Settings/> }
    ],
  },
];

const createBrowserRouter = BrowserRouter;

export default createBrowserRouter;
