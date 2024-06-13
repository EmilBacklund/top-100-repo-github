import { debounce } from 'lodash';
import { useState, useCallback } from 'react';
import { TbSortAscendingNumbers, TbSortDescendingNumbers } from 'react-icons/tb';
import { FidgetSpinner } from 'react-loader-spinner';

const SearchBar = ({ onSearchInput, order, setOrder, loading }) => {
  const [search, setSearch] = useState('');

  // Debounce the search input to avoid unnecessary API calls on every keystroke
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearchInput(value);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleClick = () => {
    if (order === 'asc') {
      setOrder('desc');
    } else {
      setOrder('asc');
    }
  };

  return (
    <div className='relative'>
      <input
        value={search}
        onChange={handleSearch}
        placeholder='Search repository'
        className='w-full rounded-2xl p-3 bg-secondaryGrey focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-opacity-50'
        type='search'
      />
      <button
        onClick={handleClick}
        className='absolute right-0 top-1/2 -translate-y-1/2 px-3  focus:outline-none focus:ring-2 focus:ring-primaryGrey bg-primaryBlue cursor-pointer hover:bg-blue-500 transition duration-200 h-full'
      >
        {loading && (
          <div className='flex items-center gap-2'>
            <p>Loading...</p>
            <FidgetSpinner
              height={24}
              width={24}
              backgroundColor='#EB737A'
              ballColors={['#909090', '#4078C0', '#C0A440']}
            />
          </div>
        )}
        {!loading && order === 'asc' && (
          <div className='flex items-center gap-2'>
            <p>Ascending</p>
            <TbSortAscendingNumbers />{' '}
          </div>
        )}
        {!loading && order === 'desc' && (
          <div className='flex items-center gap-2'>
            <p>Descending</p>
            <TbSortDescendingNumbers />{' '}
          </div>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
