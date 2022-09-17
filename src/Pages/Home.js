import React from 'react';
import Loading from '../Components/Common/Loading';
import HomeSection from '../Components/Home/HomeSection';
import useAuth from '../hooks/useAuth';

const Home = () => {
     const { isLoading, user } = useAuth();

     return (
          <section className="h-[100vh] flex justify-center items-center">
               {
                    isLoading || !user ? <Loading /> : <HomeSection />
               }
          </section>
     );
};

export default Home;