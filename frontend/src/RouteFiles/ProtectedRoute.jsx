import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  // Checking for the 'isAuthenticated' value from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; 

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  return children; // Render the protected component if authenticated
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;