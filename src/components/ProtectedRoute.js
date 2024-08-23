import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ token, children }) {
  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render the children (protected component)
  return children;
}

export default ProtectedRoute;