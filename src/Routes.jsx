import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react'

import { NotFound } from "./Components/Pages/NotFound";
import { LoadingScreen } from "./Components/Pages/LoadingScreen";

import PrivateRoute from './Components/HOC/PrivateRoute';
import ProfileCompletionCheck from './Components/HOC/ProfileCompletionCheck'


const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    {React.createElement(Component, props)}
  </Suspense>
)

//lazy loading components begin -------------------

const Login = Loadable(lazy(() => import("./Components/Pages/Login").then(module => ({ default: module.Login }))));
const Dashboard = Loadable(lazy(() => import("./Components/Pages/Dashboard").then(module => ({ default: module.Dashboard }))));
const Register = Loadable(lazy(() => import("./Components/Pages/Register").then(module => ({ default: module.Register }))));

const Home = Loadable(lazy(() => import("./Components/NavlinkPages/Home").then(module => ({ default: module.Home }))));
const NewJob = Loadable(lazy(() => import("./Components/NavlinkPages/NewJob").then(module => ({ default: module.NewJob }))));
const ManageJobs = Loadable(lazy(() => import("./Components/NavlinkPages/ManageJobs").then(module => ({ default: module.ManageJobs }))));
const MyProfile = Loadable(lazy(() => import("./Components/NavlinkPages/MyProfile").then(module => ({ default: module.MyProfile }))));
const AllApplicants = Loadable(lazy(() => import("./Components/NavlinkPages/AllApplicants").then(module => ({ default: module.AllApplicants }))));
const Shortlisted = Loadable(lazy(() => import("./Components/NavlinkPages/Shortlisted").then(module => ({ default: module.Shortlisted }))));
const Settings = Loadable(lazy(() => import("./Components/NavlinkPages/Settings").then(module => ({ default: module.Settings }))));

//lazy loading components end -------------------



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
      { path: "home", element: <ProfileCompletionCheck> <Home/> </ProfileCompletionCheck> },
      { path: "newjob", element: <ProfileCompletionCheck> <NewJob /> </ProfileCompletionCheck> },
      { path: "managejob", element: <ProfileCompletionCheck> <ManageJobs /> </ProfileCompletionCheck>  },
      { path: "myprofile", element: <MyProfile /> },
      { path: "allaplicants", element: <ProfileCompletionCheck> <AllApplicants /> </ProfileCompletionCheck>  },
      { path: "shortlisted", element: <ProfileCompletionCheck> <Shortlisted/> </ProfileCompletionCheck>  },
      { path: "settings", element: <ProfileCompletionCheck> <Settings/> </ProfileCompletionCheck>  }
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
];

const createBrowserRouter = BrowserRouter;

export default createBrowserRouter;
