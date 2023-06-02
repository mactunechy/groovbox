import Link from 'next/link';
import React, { FC } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { MdOutlineGrade } from 'react-icons/md';

const SongCard: FC<{
  song: any;
  i: number;
}> = ({ song }) => {
  console.log('song', song);

  return (
    <div className='card card-side bg-white/10 bg-opacity-80 shadow-xl mb-3'>
      <figure>
        <img
          src={song?.images?.coverart || '/assets/images/default-coverart.jpg'}
          alt={song?.title}
          className=' w-[100px] h-[100px] object-cover'
          width={100}
          height={100}
        />
      </figure>
      <div className='card-body p-4 text-white'>
        <Link href={`/studio/songs/${song.key}/details`}>
          <p className=' font-bold text-white truncate w-[150px] hover:text-purple-500'>
            {song?.title}
          </p>
        </Link>
        <div className='flex justify-between'>
          <Link href={`/studio/artists/${song?.artists?.[0]?.adamid}/details`}>
            <small className=' text-gray-300 mt-1 mr-5 hover:text-purple-500 '>
              {song?.subtitle}
            </small>
          </Link>
          <div className=' text-gray-300 mt-1 flex  '>
            <Link href={`/studio/songs/${song.key}/details`}>
              <BiAddToQueue
                size={35}
                className='text-gray-300 hover:text-purple-500'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
