'use client';

import { MusicPlayer, SongBar } from '@components';
import React from 'react';
import { useSelector } from 'react-redux';

const DjBooth = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  const data = [];
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-2/3 p-4'>
        {/* A purple translucent card qith full width and height 30% vh */}
        <div className='bg-white/10 rounded-lg w-full min-screen-full  md:min-h-screen mt-5 flex items-center justify-center p-5'>
          <div className='flex flex-col justify-center items-center'>
            {activeSong?.title ? (
              <MusicPlayer />
            ) : (
              <div className='w-full'>
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='font-bold text-3xl text-white'>
                    No active song 😒
                  </h1>
                  <small className='text-base text-gray-400 text-center mt-2'>
                    Play the next song to get the party started 🍻
                  </small>
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center mb-5'>
            {/* <MusicPlayer /> */}
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/3 p-4'>
        <div className='flex flex-col mt-5'>
          <h1 className='font-bold text-3xl text-white'>Upcoming songs 🎶</h1>
          <small className='text-base text-gray-400'>
            A queue of songs requested by fellow groovists
          </small>

          <div className='mt-6 w-full flex flex-col'>
            {data?.map((song, i) => (
              <SongBar
                key={`${artistId}-${song.key}-${i}`}
                song={song}
                i={i}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DjBooth;
