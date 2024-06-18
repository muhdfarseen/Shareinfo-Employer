import { BrowserRouter } from "react-router-dom";
import { Login } from "./Components/Admin/Pages/Login";
import { Dashboard } from "./Components/Admin/Pages/Dashboard";
import { NewJob } from "./Components/Admin/NavlinkPages/NewJob";
import { ManageJobs } from "./Components/Admin/NavlinkPages/ManageJobs";
import { MyProfile } from "./Components/Admin/NavlinkPages/MyProfile";
import { Register } from "./Components/Admin/Pages/Register";

export const routes = [
  {
    path: "/",
    element: <Login/>
  },
  {
    path:"register",
    element:<Register/>
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "newjob", element: <NewJob/> },
      { path: "managejob", element: <ManageJobs/> },
      { path: "myprofile", element: <MyProfile/> },
    ],
  },
];

const createBrowserRouter = BrowserRouter;

export default createBrowserRouter;
