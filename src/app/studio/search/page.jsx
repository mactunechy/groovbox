'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '@components';
import { useGetSongsBySearchQuery } from '@redux/services/shazamCore';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const params = useSearchParams();
  const searchTerm = params.get('searchTerm') || '';
  const { activeRequest, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits.map((song) => song.track);

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Showing results for{' '}
        <span className='text-yellow-600'>{searchTerm}</span>
      </h2>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeRequest={activeRequest}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
