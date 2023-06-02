'use client';

import React, { FC, useState } from 'react';
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUser,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { BiHeadphone, BiLogOut } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';
import { BiLibrary } from 'react-icons/bi';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { MusicLibrary } from '@components/new';

const LibrarySection = ({ title, isActive, handleChange }) => (
  <div
    className={`badge badge-neutral py-3 hover:cursor-pointer hover:border-gray-500${
      isActive ? ' bg-purple-500 text-white' : ''
    }`}
  >
    {title}
  </div>
);

const links = [
  { name: 'Discover', to: '/studio', icon: HiOutlineHome },
  { name: 'DJ Booth', to: '/studio/dj-booth', icon: BiHeadphone },
  { name: 'Around You', to: '/studio/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/studio/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/studio/top-charts', icon: HiOutlineHashtag },
  { name: 'My Profile', to: '/studio/my-profile', icon: HiOutlineUser },
];

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='hidden md:flex flex-col py-10 px-4 bg-[#24247f]'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          className='w-full h-14 object-contain'
          width={30}
          height={30}
        />
        <MusicLibrary />
      </div>

      {/* Mobile sidebar */}
      <div className='absolute md:hidden block top-6 right-3'>
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className='w-6 h-6 mr-2 text-white'
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className='w-6 h-6 mr-2 text-white'
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          className='w-full h-14 object-contain'
          width={30}
          height={30}
        />
        <div className='mt-10'>
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.to}
              className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
              // onClick={() => handleClick && handleClick()}
            >
              <item.icon className='w-6 h-6 mr-2' />
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => signOut({ callbackUrl: '/sign-in' })}
            className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
          >
            <BiLogOut className='w-6 h-6 mr-2' />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
