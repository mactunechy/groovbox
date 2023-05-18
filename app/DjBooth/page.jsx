import React from 'react';
import Seekbar from '../../components/MusicPlayer/Seekbar';
import { SongBar } from '../../components';

const DjBooth = () => {
  const data = [];
  return (
    <>
      {/* A purple translucent card qith full width and height 30% vh */}
      <div className='bg-white/10 rounded-lg w-full h-30vh p-5 pt-10'>
        <div className='flex flex-col justify-center items-center'>
          <img
            alt='profile'
            src=''
            className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
          />

          <div className='m-4 text-center'>
            <h2 className='text-4xl text-white'>Lil Wayne</h2>
            <p className='text-base text-gray-400'>
              Drop the world - <small>Playing now</small>
            </p>
          </div>
        </div>
        <div className='flex justify-center mb-5'>
          <Seekbar
            value={2}
            min='0'
            max={4}
            onInput={(event) => {}}
            setSeekTime={() => {}}
            appTime={4}
          />
        </div>
      </div>

      <div className='flex flex-col mt-5'>
        <h1 className='font-bold text-3xl text-white'>Upcoming songs</h1>
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
    </>
  );
};

export default DjBooth;
