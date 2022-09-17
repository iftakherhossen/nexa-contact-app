import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../Common/Loading';
import HeaderSection from './HeaderSection';
import MainSection from './MainSection';

const HomeSection = () => {
     const { user } = useAuth();
     const { loading, error, usersInfo } = useFetchData();
     const userInfo = usersInfo[0]?.find(data => data?.email === user.email);
     

     error === true && toast.error("There was an unexpected error");

     return (
          <div className="w-11/12 md:w-5/6 bg-[#2b6777] py-8 flex flex-col rounded-2xl shadow-xl h-5/6">
               {
                    loading ? <Loading data={true} /> : <>
                         <HeaderSection userInfo={userInfo} />
                         <div className="border my-5 md:my-7"></div>
                         <MainSection userInfo={userInfo} />
                    </>
               }

               <Toaster
                    position="bottom-center"
                    reverseOrder={false}
               />
          </div>
     );
};

export default HomeSection;