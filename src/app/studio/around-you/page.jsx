'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '@components';
import { useGetSongsByCountryQuery } from '@redux/services/shazamCore';

const CountryTracks = () => {
  const { activeRequest, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery();

  if (isFetching) return <Loader title='Loading Songs around you...' />;

  if (error && country !== '') return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Around you <span className='text-yellow-600'>{data.countryCode}</span>
      </h2>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeRequest={activeRequest}
            data={data.songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
