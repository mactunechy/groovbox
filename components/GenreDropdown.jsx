import { BsCaretDown } from 'react-icons/bs';

const GenreDropdown = ({ genres, handleChange, currentGenre }) => {
  return (
    <div className='dropdown mr-4'>
      <label tabIndex={0} className='btn'>
        {currentGenre || 'pop'} <BsCaretDown className='inline ml-2' />
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow bg-black text-white rounded-box w-52'
      >
        {genres.map((genre) => (
          <li key={genre.id} onClick={() => handleChange(genre)}>
            <a>{genre.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreDropdown;
