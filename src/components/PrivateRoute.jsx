import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

function PrivateRoute({ children }) {
  const { user } = useUser(); // use our custom hook

  // if the user is not authenticated, send them back to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if not, please go on ahead
  return children;
}

export default PrivateRoute;
