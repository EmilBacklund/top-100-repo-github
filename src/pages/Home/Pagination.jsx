import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { setPage } from '../../store/githubRepos/githubReposSlice';
import { useDispatch } from 'react-redux';

const Pagination = ({ count, page }) => {
  const [leftDots, setLeftDots] = useState(false);
  const [rightDots, setRightDots] = useState(true);
  const maxCount = Math.min(count, 100);
  const dispatch = useDispatch();

  const pages = Math.ceil(maxCount / 8);

  const start = (page - 1) * 8 + 1;
  const end = Math.min(page * 8, maxCount);

  // chatGPT helped me here, had problems with the dots
  const handleSetPage = (num) => {
    dispatch(setPage(num));

    if (num > 3) {
      setLeftDots(true);
    } else {
      setLeftDots(false);
    }

    if (num < pages - 2) {
      setRightDots(true);
    } else {
      setRightDots(false);
    }
  };

  return (
    <div className='flex items-center bg-background justify-between w-11/12 sm:w-full mx-auto py-3 sm:px-2 md:px-6 h-full'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className={`relative inline-flex items-center rounded-md bg-secondaryGrey px-4 py-2 text-sm font-medium transition  ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryGrey '
          }`}
          onClick={() => handleSetPage(page > 1 ? page - 1 : page)}
        >
          Previous
        </a>
        <a
          href='#'
          className={`relative ml-3 inline-flex items-center rounded-md  bg-secondaryGrey px-4 py-2 text-sm font-medium transition  ${
            page === pages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryGrey'
          }`}
          onClick={() => handleSetPage(page < pages ? page + 1 : page)}
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm '>
            Showing <span className='font-medium'>{start}</span> to{' '}
            <span className='font-medium'>{end}</span> of{' '}
            <span className='font-medium'>{maxCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              href='#'
              className={`relative inline-flex items-center rounded-l-md px-2 py-2  ring-1 ring-inset ring-secondaryGrey  focus:z-20 focus:outline-offset-0 ${
                page === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:ring-primaryGrey hover:z-20'
              }`}
              onClick={() => handleSetPage(page > 1 ? page - 1 : page)}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>

            {[...Array(pages).keys()].map((i) => {
              if (i + 1 === 1 || i + 1 === pages || (i + 1 > page - 2 && i + 1 < page + 2)) {
                return (
                  <a
                    key={i + 1}
                    href='#'
                    onClick={() => handleSetPage(i + 1)}
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-white focus:z-20 focus-visible:outline focus-visible:outline-2 hover:z-20 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      i + 1 === page
                        ? 'bg-primaryGrey'
                        : 'ring-1 ring-inset ring-secondaryGrey hover:ring-primaryGrey'
                    }${i + 1 === pages - 2 ? ' hidden md:inline-flex' : ''}`}
                  >
                    {i + 1}
                  </a>
                );
              } else if (i + 1 === page - 2 && leftDots) {
                return (
                  <span
                    key={i + 1}
                    className='relative inline-flex items-center px-4 py-2 text-sm font-medium  text-primaryGrey ring-1 ring-inset ring-secondaryGrey focus:outline-offset-0 hover:z-20'
                  >
                    ...
                  </span>
                );
              } else if (i + 1 === page + 2 && rightDots) {
                return (
                  <span
                    key={i + 1}
                    className='relative inline-flex items-center px-4 py-2 text-sm font-medium  text-primaryGrey ring-1 ring-inset ring-secondaryGrey focus:outline-offset-0 hover:z-20'
                  >
                    ...
                  </span>
                );
              } else {
                return null;
              }
            })}
            <a
              href='#'
              className={`relative inline-flex items-center rounded-r-md px-2 py-2  ring-1 ring-inset ring-secondaryGrey  focus:z-20 focus:outline-offset-0  ${
                page === pages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:z-20 hover:ring-primaryGrey'
              }`}
              onClick={() => handleSetPage(page < pages ? page + 1 : page)}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
