'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Error,
  Loader,
  RecentlyRequested,
  ProfileDetailsHeader,
} from '@components';

import { setActiveSong, playPause } from '@redux/features/playerSlice';
// import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { activeRequest, isPlaying } = useSelector((state) => state.player);

  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = {
    data: [],
  };
  const { data: songData, isFetching: isFetchingSongDetails } = {};

  if (isFetchingSongDetails && isFetchinRelatedSongs)
    return <Loader title='Searching song details' />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className='flex flex-col'>
      <ProfileDetailsHeader artistId={1} songData={songData} />

      <RecentlyRequested
        data={data}
        artistId={1}
        isPlaying={isPlaying}
        activeRequest={activeRequest}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default MyProfile;
