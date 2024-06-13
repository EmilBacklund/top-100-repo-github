import SearchBar from './SearchBar';
import Repositories from './Repositories';
import { useState } from 'react';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [resetPage, setResetPage] = useState(false);
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  const handleSearchInput = (value) => {
    setSearchInput(value);
    setResetPage(true);
  };

  return (
    <div className='max-w-container mx-auto w-11/12 '>
      <div className='grid place-items-center mt-8 mb-6'>
        <h1 className='font-medium text-center text-transparent text-2xl sm:text-4xl bg-clip-text bg-gradient-to-r from-primaryRed to-primaryBlue'>
          GitHub's 100 Most Starred Projects
        </h1>
      </div>
      <SearchBar
        loading={loading}
        onSearchInput={handleSearchInput}
        order={order}
        setOrder={setOrder}
      />
      <Repositories
        setLoading={setLoading}
        loading={loading}
        searchInput={searchInput}
        resetPage={resetPage}
        order={order}
      />
    </div>
  );
};

export default Home;
