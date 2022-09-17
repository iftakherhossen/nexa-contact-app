import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../Common/Loading';

const PrivateRoute = ({ children, ...rest }) => {
     const { user, isLoading } = useAuth();
     let location = useLocation();

     if (isLoading) {
          return <Loading />
     }
     else if (user.email) {
          return children;
     }

     return (
          <Navigate exact to="/" state={{ from: location }} />
     );
};

export default PrivateRoute;