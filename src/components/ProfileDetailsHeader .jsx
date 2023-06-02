'use client';

import React from 'react';

const ProfileDetailsHeader = () => (
  <div className='relative w-full flex flex-col'>
    <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28' />

    <div className='absolute inset-0 flex items-center'>
      <img
        alt='profile'
        src=''
        className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
      />

      <div className='ml-5'>
        <p className='font-bold sm:text-3xl text-xl text-white'>
          Dellan Much <br />
          <small className='text-base text-gray-400 ml-2'>dee@gmail.com</small>
        </p>

        <div className='bg-white/10 rounded-lg p-2 mt-2 w-[300px]'>
          <p className='text-base text-gray-400 m-3'>
            <span className='font-bold'>Credits Available:</span> 🪙 100
            <br />
            <small className='leading-tight'>
              {' '}
              You can play an approximate of 20 songs depending on the genre
              pricing{' '}
            </small>
          </p>
          <div className='m-3 '>
            <button
              type='button'
              className='bg-cyan-400 text-white rounded-lg px-2 py-1 mt-2'
            >
              Purchase Credits
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className='w-full sm:h-44 h-24' />
  </div>
);

export default ProfileDetailsHeader;
