import { useEffect, useState } from 'react';
import fetchRepositories from '../../api/fetchRepositories';
import { FaStar } from 'react-icons/fa';
import Pagination from './Pagination';
import { NavLink } from 'react-router-dom';
import Skeleton from './Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { setRepoData, setRank } from '../../store/githubRepos/githubReposSlice';

const Repositories = ({ searchInput, resetPage, order, loading, setLoading }) => {
  const [count, setCount] = useState(null);
  const dispatch = useDispatch();
  const { repoData, page } = useSelector((state) => state.githubRepos);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchRepositories({
      q: `${searchInput} stars:>60000`,
      sort: 'stars',
      order: order,
      page: resetPage === true ? 1 : page,
      per_page: 8,
    })
      .then((data) => {
        dispatch(setRepoData(data.items));
        setCount(data.total_count);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error?.response?.data?.message || error.message || 'An unknown error occurred');
        setLoading(false);
      });
  }, [page, searchInput, order]);

  return (
    <>
      <main className='relative h-[calc(100vh-152px)] sm:h-[calc(100vh-208px)] tablet:h-[calc(100vh-168px)] mt-4 sm:mt-6'>
        <div className='absolute inset-0 '>
          <div
            className={`space-y-4 sm:space-y-6 flex-1 h-[calc(100%-112px)]  smallScreen:h-[calc(100%-80px)]  ${
              repoData ? 'overflow-y-auto' : 'overflow-y-hidden'
            }`}
          >
            {repoData &&
              !loading &&
              repoData.map((repo, index) => {
                let rank;
                if (order === 'desc') {
                  rank = (page - 1) * 8 + index + 1;
                } else {
                  // if order is asc, rank is calculated differently
                  let maxRank = Math.min(count, 100);
                  rank = maxRank - ((page - 1) * 8 + index);
                }
                if (page < 13 || (page === 13 && index < 4)) {
                  return (
                    <NavLink
                      to={`/repository/${repo.id}`}
                      key={repo.id}
                      onClick={() =>
                        dispatch(setRank(!searchInput ? (page - 1) * 8 + index + 1 : null))
                      }
                      className='h-20 cursor-pointer focus:border-primaryBlue focus:border-opacity-50 focus:border-2 focus:outline-none hover:border-primaryGrey transition duration-300 sm:items-center items-start flex flex-col sm:flex-row justify-center gap-2 sm:justify-between border border-secondaryGrey rounded px-4'
                    >
                      <div className='flex gap-4 sm:gap-8 items-center'>
                        <p className='text-primaryRed'>#{rank}</p>
                        <p>{repo.name}</p>
                      </div>
                      <div className='flex gap-4 sm:gap-8 items-center'>
                        <FaStar className='text-primaryYellow' />
                        <p>{repo.stargazers_count}</p>
                      </div>
                    </NavLink>
                  );
                }
              })}
            {loading && [...Array(8)].map((_, index) => <Skeleton key={index} />)}
            {!count && (
              <div className='flex justify-center flex-col items-center h-full'>
                <p className='text-2xl'>No results found</p>
                {searchInput && <p>for "{searchInput}"</p>}
                {error && <p className='text-primaryRed'>Something went wrong {error}</p>}
              </div>
            )}
          </div>
          <div className='h-20 w-full inset-x-0 fixed bottom-0 z-10'>
            {count > 8 && (
              <div className='max-w-container mx-auto border-t  sm:w-11/12 border-secondaryGrey h-full'>
                <Pagination count={count} page={page} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Repositories;
