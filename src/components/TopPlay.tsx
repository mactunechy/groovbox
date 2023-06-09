'use client';

/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Link from 'next/link';
import EnqueueSong from './EnqueueSong';
import { BiAddToQueue } from 'react-icons/bi';

const TopChartCard = ({ song, i, activeRequest }) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeRequest?.song?.title === song?.title
        ? 'bg-[#4c426e]'
        : 'bg-transparent'
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>
    <div className='flex-1 flex flex-row justify-between items-center'>
      <img
        className='w-20 h-20 rounded-lg'
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link href={`/studio/songs/${song.key}/details`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
        </Link>
        <Link href={`/studio/artists/${song?.artists[0].adamid}/details`}>
          <p className='text-base text-gray-300 mt-1'>{song?.subtitle}</p>
        </Link>
      </div>
    </div>{' '}
    <Link href={`/studio/songs/${song?.key}/details`}>
      <BiAddToQueue size={35} className='text-gray-300' />
    </Link>
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeRequest, isPlaying } = useSelector(
    (state: any) => state.player
  );
  const { data } = useGetTopChartsQuery(null);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[350px] max-w-full flex flex-col'
    >
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link href='/studio/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              activeRequest={activeRequest}
            />
          ))}
        </div>
      </div>

      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link href='/studio/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topPlays?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '25%', height: 'auto' }}
              className='shadow-lg rounded-full animate-slideright'
            >
              <Link
                href={`/studio/artists/${artist?.artists[0].adamid}/details`}
              >
                <img
                  src={artist?.images?.background}
                  alt='Name'
                  className='rounded-full w-full object-cover'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
