import {
  useGetSongsByCountryQuery,
  useGetTopChartsQuery,
} from '@redux/services/shazamCore';
import React, { useState } from 'react';
import { BiLibrary } from 'react-icons/bi';

import { ArtistCard, SongCard } from '@components/new';

const LibrarySection = ({ title, isActive, handleChange }) => (
  <div
    onClick={handleChange}
    className={`badge badge-neutral py-3 hover:cursor-pointer hover:border-gray-500${
      isActive ? ' bg-purple-500 text-white' : ''
    }`}
  >
    {title}
  </div>
);

const MusicLibrary = () => {
  const [currentTab, setCurrentTab] = useState('top-charts');

  const { data: songsArroundYou } = useGetSongsByCountryQuery(null);
  const { data: topCharts } = useGetTopChartsQuery(null);

  const topChartsSlice = topCharts?.slice(0, 8);
  //Hack
  const arroundYouSlice = (songsArroundYou?.songs as any)?.slice(0, 8);

  return (
    <div className='card w-96  bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup shadow-xl mt-6  '>
      <div className='card-body'>
        <div className='card-title flex text-white'>
          <BiLibrary className='w-6 h-6' color='white' />
          <h2>Your Library</h2>
        </div>
        <div className='flex gap-1 mt-2'>
          <LibrarySection
            title='Top Charts'
            isActive
            handleChange={() => setCurrentTab('top-charts')}
          />

          <LibrarySection
            title='Around you'
            isActive={false}
            handleChange={() => setCurrentTab('around-you')}
          />
          <LibrarySection
            title='Top Artists'
            isActive={false}
            handleChange={() => setCurrentTab('top-artists')}
          />
        </div>
        <div className='mt-2 h-[calc(100vh-300px)] hide-scrollbar overflow-y-scroll '>
          {currentTab === 'top-charts'
            ? topChartsSlice?.map((song, i) => (
                <SongCard key={song.key} song={song} i={i} />
              ))
            : currentTab === 'around-you'
            ? arroundYouSlice?.map((song, i) => (
                <SongCard key={song.key} song={song} i={i} />
              ))
            : currentTab === 'top-artists'
            ? null
            : null}
        </div>
      </div>
    </div>
  );
};

export default MusicLibrary;
