'use client';

import { Inter } from 'next/font/google';

import {
  AppProvider,
  MusicPlayer,
  Searchbar,
  Sidebar,
  TopPlay,
} from '@components';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const activeSong = null;

  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppProvider>
          <div className='relative flex'>
            <Sidebar />
            <div className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'>
              {/* 2 columns of size 3 and 1 respectively */}
              <div className='flex'>
                <div className=''>
                  <Searchbar />
                </div>
                <div className=''>{/* User profile image and Name */}</div>
              </div>

              <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
                <div className='flex-1 h-fit pb-40'>{children}</div>
                <div className='xl:sticky relative top-0 h-fit'>
                  <TopPlay />
                </div>
              </div>
            </div>

            {activeSong?.title && (
              <div className='absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'>
                <MusicPlayer />
              </div>
            )}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
