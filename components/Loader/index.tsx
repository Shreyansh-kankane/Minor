import React from 'react'

const Loader = () => {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="w-20 h-20 border-4 border-dashed rounded-full border-danger animate-spin"/>
      </div>
    );
  };
  

export default Loader