'use client';

import { DjBoothSongBar, MusicPlayer } from '@components';
import { playPause, setActiveSong } from '@redux/features/playerSlice';
import { useUpcomingRequestsQuery } from '@redux/services/core';
import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const DjBooth = () => {
  const dispatch = useDispatch();
  const { activeSong, currentIndex, isActive, isPlaying } = useSelector(
    (state) => state.player
  );

  const djId = 'clhuq9lzz0000my14zmyefayv'; //TODO: this should come from the session
  const { data, isFetching, error } = useUpcomingRequestsQuery(djId);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-2/3 p-4'>
        {activeSong?.title ? (
          <div className='card w-full h-full bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={activeSong?.images?.coverart} alt='Shoes' />
            </figure>
            <div className='card-body h-full'>
              <MusicPlayer />
            </div>
          </div>
        ) : (
          <div className='card w-full h-full bg-purple-950 flex items-center justify-center'>
            <h1 className='font-bold text-3xl text-white'>No active song 😒</h1>
            <small className='text-base text-gray-400 text-center mt-2'>
              Play the next song to get the party started 🍻
            </small>
          </div>
        )}
      </div>
      <div className='w-full md:w-1/3 p-4'>
        <div className='flex flex-col mt-5'>
          <h1 className='font-bold text-3xl text-white'>Upcoming songs 🎶</h1>
          <small className='text-base text-gray-400'>
            A queue of songs requested by fellow groovists
          </small>

          <div className='mt-6 w-full flex flex-col'>
            {isFetching ? (
              <div className='text-white texy-center'>Loading...</div>
            ) : error ? (
              <div className='text-white text-center h-full flex items-center justify-center'>
                <BiErrorCircle color='red' className='mr-2' size={30} />
                <span> There was an error fetching the songs</span>
              </div>
            ) : (
              data?.map((request, i) => (
                <DjBoothSongBar
                  key={`${request.song.artists[0].id}-${request.key}-${i}`}
                  song={request.song}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={() => handlePlayClick(request.song, i)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DjBooth;
