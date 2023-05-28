'use client';

import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '@components';
import { genres } from '@utils/constants';
import { selectGenreListId } from '@redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '@redux/services/shazamCore';
import DjDropdown from '@components/DjDropdown';
import GenreDropdown from '@components/GenreDropdown';

const Discover = () => {
  const dispatch = useDispatch();
  const { currentDj } = useSelector((state) => state.core);
  const { genreListId } = useSelector((state) => state.player);
  const { activeRequest, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'POP'
  );

  if (isFetching) return <Loader title='Loading songs...' />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <div className='flex flex-col'>
          <h2 className='font-bold text-3xl text-white text-left flex-auto justify-end'>
            {currentDj ? (
              currentDj.name
            ) : (
              <>
                No DJ selected
                <small className='ml-2 font-light text-base text-gray-400'>
                  Select a DJ to get started
                </small>
              </>
            )}
          </h2>
          <DjDropdown />
        </div>

        <GenreDropdown
          genres={genres}
          currentGenre={genreListId}
          handleChange={(genre) => dispatch(selectGenreListId(genre.value))}
        />
      </div>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, i) => (
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

export default Discover;
