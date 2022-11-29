import React from 'react';
import { Navigate } from 'react-router-dom';
// will remove later
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
  const { myUser, isAuthenticated } = useUserContext();

  const isUser = myUser && isAuthenticated;

  return isUser ? children : <Navigate to='/' />;
};
export default PrivateRoute;
