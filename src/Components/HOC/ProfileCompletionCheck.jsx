import { Navigate } from "react-router-dom";

const ProfileCompletionCheck = ({ children }) => {
  const isProfileCreated = localStorage.getItem('is_profile_created') === 'true';

  if (!isProfileCreated) {
    return <Navigate to="/dashboard/myprofile" replace />;
  }

  return children;
};

export default ProfileCompletionCheck;
