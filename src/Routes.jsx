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
import PrivateRoute from './Components/HOC/PrivateRoute';
import ProfileCompletionCheck from './Components/HOC/ProfileCompletionCheck'

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
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      { path: "newjob", element: <ProfileCompletionCheck> <NewJob /> </ProfileCompletionCheck> },
      { path: "managejob", element: <ProfileCompletionCheck> <ManageJobs /> </ProfileCompletionCheck>  },
      { path: "myprofile", element: <MyProfile /> },
      { path: "allaplicants", element: <ProfileCompletionCheck> <AllApplicants /> </ProfileCompletionCheck>  },
      { path: "shortlisted", element: <ProfileCompletionCheck> <Shortlisted/> </ProfileCompletionCheck>  },
      { path: "settings", element: <ProfileCompletionCheck> <Settings/> </ProfileCompletionCheck>  }
    ],
  },
];

const createBrowserRouter = BrowserRouter;

export default createBrowserRouter;
