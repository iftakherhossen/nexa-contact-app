import React from 'react';
import { Triangle } from 'react-loader-spinner';

const Loading = ({ data }) => {
     return (
          <div className="h-[100vh] flex justify-center items-center">
               <div className="flex justify-center items-center">
                    <Triangle
                         height="120"
                         width="120"
                         color={data ? "#f2f2f2" : "#2b6777"}
                         ariaLabel="triangle-isLoading"
                         visible={true}
                    />
               </div>
          </div>
     );
};

export default Loading;