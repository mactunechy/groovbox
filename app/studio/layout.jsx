'use client';

import {
  AppProvider,
  PlayerFooter,
  Searchbar,
  Sidebar,
  TopPlay,
} from '@components';

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <div className='relative flex'>
        <Sidebar />
        <div className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'>
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

        <PlayerFooter />
      </div>
    </AppProvider>
  );
}
