'use client';

import { setCurrentDj } from '@redux/features/coreSlice';
import { useGetAllDjsQuery } from '@redux/services/core';
import { BsCaretDown } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

const DjDropdown = () => {
  const dispatch = useDispatch();
  const { data: djs, isFetching, error } = useGetAllDjsQuery();

  if (isFetching) return null;
  if (error) {
    console.log(error);
    return null;
  }

  const handleChange = (dj) => {
    dispatch(setCurrentDj(dj));
  };
  return (
    <div className='dropdown'>
      <label tabIndex={0} className='text-blue-400 m-1 inline-block'>
        Djs/ Clubs/ Lounges <BsCaretDown className='inline' />
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow bg-black text-white rounded-box w-52'
      >
        {djs.map((dj) => (
          <li key={dj.id} onClick={() => handleChange(dj)}>
            <a>{dj.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DjDropdown;
