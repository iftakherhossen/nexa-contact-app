import React from 'react';
import Loading from '../Components/Common/Loading';
import LoginSection from '../Components/Login/LoginSection';
import useAuth from '../hooks/useAuth';

const Login = () => {
     const { isLoading } = useAuth();

     return (
          <section className="h-[100vh] flex justify-center items-center">
               {
                    isLoading ? <Loading /> : <LoginSection />
               }
          </section>
     );
};

export default Login;