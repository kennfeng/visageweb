import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';

function PrivateRoute({ children }) {
  const { user } = useUserContext(); // get the user from the context

  // if the user is not authenticated, send them BACK to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if not, please go on ahead
  return children;
}

export default PrivateRoute;