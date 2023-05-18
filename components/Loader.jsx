import React from 'react';

import Image from 'next/image';

const Loader = ({ title }) => (
  <div className='w-full flex justify-center items-center flex-col'>
    <Image
      src='/assets/images/loader.svg'
      alt='loader'
      className='w-32 h-32 object-contain'
      width={30}
      height={30}
    />
    <h1 className='font-bold text-2xl text-white mt-2'>{title || 'Loading'}</h1>
  </div>
);

export default Loader;
