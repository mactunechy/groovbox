'use client';

import { BiErrorCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import DjDropdown from './DjDropdown';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsSpeaker } from 'react-icons/bs';
import { useRequestSongMutation } from '@redux/services/core';

const EnqueueSong = ({ song }) => {
  const { currentDj } = useSelector((state) => state.core);
  const [requestSong, { isLoading, error, isSuccess, isError }] =
    useRequestSongMutation();

  console.log('song', song);

  const submitRequest = () => {
    requestSong({ song, djId: currentDj.id });
  };

  return (
    <>
      <div
        className='tooltip hover:tooltip-open tooltip-left'
        data-tip='request dj to play'
      >
        <label htmlFor='modal-enqueue-song' className='btn btn-primary  mt-3'>
          <BsSpeaker className='mr-2' />
          Add to active playlist
        </label>
      </div>

      {/* The button to open modal */}
      {/* Put this part before </body> tag */}
      <input type='checkbox' id='modal-enqueue-song' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box bg-purple-200'>
          {isSuccess ? (
            <>
              <div className='h-full fex items-center justify-center py-5'>
                <AiOutlineCheckCircle
                  size={200}
                  className='mx-auto my-5'
                  color='green'
                />
                <h3 className='font-bold text-2xl text-center text-black-400'>
                  Song requested successfully
                </h3>
              </div>
              <div className='modal-action'>
                <label htmlFor='modal-enqueue-song' className='btn'>
                  Close
                </label>
              </div>
            </>
          ) : isError ? (
            <>
              <div className='h-full fex items-center justify-center py-5'>
                <BiErrorCircle
                  size={200}
                  className='mx-auto my-5'
                  color='red'
                />
                <h3 className='font-bold text-2xl text-center text-black-400'>
                  Something went wrong
                </h3>
              </div>
              <div className='modal-action'>
                <label htmlFor='modal-enqueue-song' className='btn'>
                  Close
                </label>
              </div>
            </>
          ) : (
            <div className='h-[300px]'>
              <h3 className='font-bold text-lg'>Song Request 🎶</h3>
              <p className='py-4'>
                You're about to request
                <strong className='text-purple-900'> {song.title} </strong>
                from the Dj, and it's going to cost you 🪙 100 credits
              </p>
              {currentDj ? (
                <>
                  <p>
                    <strong className='text-purple-900'>Note:</strong> Song will
                    be played at or by <strong>{currentDj?.name}</strong>.
                  </p>
                  <p> Change Location: </p>
                </>
              ) : (
                <p>
                  <strong className='text-purple-900'>Note:</strong> Please
                  select a location or Dj to play the song
                </p>
              )}
              <DjDropdown />
              <div className='modal-action'>
                <label htmlFor='modal-enqueue-song' className='btn'>
                  Close
                </label>
                <button
                  disabled={isLoading || !currentDj}
                  className='btn btn-primary'
                  onClick={submitRequest}
                >
                  {isLoading ? 'Requesting...' : 'Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnqueueSong;
