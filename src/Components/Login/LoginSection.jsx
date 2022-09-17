import React from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginSection = () => {
     let navigate = useNavigate();
     const { signInWithGoogle } = useAuth();

     return (
          <div className="w-5/6 sm:w-3/4 md:w-2/4 bg-[#2b6777] py-16 flex flex-col justify-center items-center rounded-3xl shadow-xl">
               <div className="text-center">
                    <h1 className="text-[#f2f2f2] font-bold text-xl mb-1">Nexa Contact App</h1>
                    <h2 className="text-white text-3xl font-bold">Login to Continue</h2>
               </div>

               <div className="mt-12">
                    <GoogleButton
                         onClick={() => signInWithGoogle(navigate)}
                         style={{ boxShadow: 'none', fontFamily: 'Caudex serif', fontWeight: 700 }}
                    />
               </div>
          </div>
     );
};

export default LoginSection;