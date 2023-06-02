import React from 'react';
import { useDispatch } from 'react-redux';

import { playPause, setActiveSong } from '@redux/features/playerSlice';
import Link from 'next/link';
import { BiAddToQueue } from 'react-icons/bi';

const SongCard = ({ song, isPlaying, activeRequest, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className='flex flex-col p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeRequest?.song?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <Link href={`/studio/songs/${song?.key}/details`}>
            <BiAddToQueue size={35} className='text-gray-300' />
          </Link>
        </div>
        <img
          alt='song_img'
          src={song.images?.coverart}
          className='w-full h-full rounded-lg'
        />
      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate w-[200px]'>
          <Link href={`/studio/songs/${song?.key}/details`}>{song.title}</Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1 w-[200px]'>
          <Link
            href={
              song.artists
                ? `/studio/artists/${song?.artists[0]?.adamid}/details`
                : '/studio/top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
