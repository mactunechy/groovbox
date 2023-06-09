'use client';

import { useSelector } from 'react-redux';

const PlayerFooter = () => {
  const { activeRequest, isActive, isPlaying } = useSelector(
    (state) => state.player
  );

  if (!activeRequest?.song?.title) return null;
  return (
    <div className='absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'>
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeRequest={activeRequest}
      />
    </div>
  );
};

export default PlayerFooter;
