import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { AdmLayout } from "../Layout/Admin/AdmLayout";
const ProtectedRoute = () => {
    const { token } = useAuth();
  
    // Check if the user is authenticated
    if (!token) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
    // If authenticated, render the child routes
    return (
      <>
        <AdmLayout>
            <Outlet />
        </AdmLayout>
      </>
    );
  };

  export default ProtectedRoute;