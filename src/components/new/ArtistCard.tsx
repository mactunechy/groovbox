import React from 'react';
import { MdOutlineGrade } from 'react-icons/md';

const ArtistCard = () => {
  return (
    <div className='card card-side  bg-white/10 bg-opacity-80 shadow-xl hover:bg-gray-600'>
      <figure>
        <img
          src='https://images.pexels.com/photos/16864846/pexels-photo-16864846/free-photo-of-fashion-man-people-woman.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1'
          alt='Movie'
          className=' w-[100px] h-[100px] object-cover'
        />
      </figure>
      <div className='card-body p-4 text-white'>
        <h3 className='card-title'>Kanye West</h3>
        <small className=' text-gray-300 mr-5'>Artist</small>
      </div>
    </div>
  );
};

export default ArtistCard;
