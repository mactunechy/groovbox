import React from 'react';

const Loader = ({ title }) => (
  <div className='w-full flex justify-center items-center flex-col'>
    <span className='loading loading-ring loading-lg'></span>
    <h1 className='font-bold text-2xl text-white mt-2'>{title || 'Loading'}</h1>
  </div>
);

export default Loader;
