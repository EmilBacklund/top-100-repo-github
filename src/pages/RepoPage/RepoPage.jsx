import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useEffect, useState } from 'react';
import fetchSingleRepo from '../../api/fetchSingleRepo';
import { setRepoData } from '../../store/githubRepos/githubReposSlice';

const RepoPage = () => {
  const { id } = useParams();
  const { repoData, rank } = useSelector((state) => state.githubRepos);
  const repo = repoData?.find((repo) => repo.id === parseInt(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  // backup request if user navigates directly to repo page with id or refreshes the page
  useEffect(() => {
    if (!repo) {
      fetchSingleRepo(id)
        .then((data) => {
          dispatch(setRepoData([data]));
          setError(null);
        })
        .catch((error) => {
          setError(error);
          console.error(error);
        });
    } else {
      document.title = `${repo.name} | Github Repo`;
    }
  }, [id, repo]);

  return (
    <>
      {error && (
        <div className='max-w-container mx-auto w-11/12 mb-6'>
          <div className='grid place-items-center mt-8 mb-6'>
            <h1 className='font-medium text-center text-transparent text-2xl sm:text-4xl bg-clip-text bg-gradient-to-r from-primaryRed to-primaryBlue'>
              Repository not found
            </h1>
          </div>
          <div className='flex justify-center'>
            <button
              className='group relative inline-flex items-center rounded-md p-2 text-sm font-medium transition  '
              onClick={() => navigate(-1)}
            >
              <div className='flex gap-2 items-center'>
                <IoIosArrowRoundBack className='text-primaryGrey w-8 h-8 ' />

                <span className='group-hover:underline '>Go Back</span>
              </div>
            </button>
          </div>
          <div className='flex justify-center flex-col items-center h-full'>
            {error && (
              <p className='text-primaryRed'>
                Something went wrong: {error.response.status} {error.response.data.message}
              </p>
            )}
          </div>
        </div>
      )}
      {repo && (
        <div className='max-w-container mx-auto w-11/12 mb-6'>
          <div className='grid place-items-center mt-8 mb-6'>
            <h1 className='font-medium text-center text-transparent text-2xl sm:text-4xl bg-clip-text bg-gradient-to-r from-primaryRed to-primaryBlue'>
              {repo.name}
            </h1>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span className='text-primaryGrey font-medium text-lg'>
                  Repository {!rank && <span>stars</span>}
                  {rank && <span>rank</span>}:
                </span>{' '}
                <div className='flex gap-2 items-center'>
                  <span>
                    {rank && <span>Rank {rank} with </span>}
                    <span className='text-primaryYellow font-medium'>
                      {repo.stargazers_count}
                    </span>{' '}
                    stars
                  </span>{' '}
                  <FaStar className='text-primaryYellow inline' />
                </div>
              </div>
              <div>
                <button
                  className='group relative inline-flex items-center rounded-md p-2 text-sm font-medium transition  '
                  onClick={() => navigate(-1)}
                >
                  <div className='flex gap-2 items-center'>
                    <IoIosArrowRoundBack className='text-primaryGrey w-8 h-8 ' />

                    <span className='group-hover:underline '>Go Back</span>
                  </div>
                </button>
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository name:</span>{' '}
              <span>{repo.name}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository description:</span>{' '}
              <span>{repo.description}</span>
            </div>
            {repo.language && (
              <div className='flex flex-col'>
                <span className='text-primaryGrey font-medium text-lg'>
                  Repository most used language:
                </span>{' '}
                <span>{repo.language}</span>
              </div>
            )}
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository owner:</span>{' '}
              <span>
                {repo.owner.login}{' '}
                <a
                  href={repo.owner.html_url}
                  target='_balnk'
                  className='text-primaryBlue hover:underline'
                >
                  {repo.owner.html_url}
                </a>
              </span>
            </div>
            {repo.owner.avatar_url && (
              <div>
                <div className='text-primaryGrey font-medium text-lg'>Repository owner image:</div>
                <img className='rounded w-24' src={repo.owner.avatar_url} alt={repo.owner.login} />
              </div>
            )}
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository url:</span>{' '}
              <a
                href={repo.html_url}
                target='_blank'
                rel='noreferrer'
                className='text-primaryBlue hover:underline'
              >
                {repo.html_url}
              </a>
            </div>
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository created at:</span>{' '}
              <span>{new Date(repo.created_at).toLocaleDateString()}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository updated at:</span>{' '}
              <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository forks:</span>{' '}
              <span>{repo.forks}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-primaryGrey font-medium text-lg'>Repository size:</span>{' '}
              <span>{(repo.size / 1024).toFixed(2)} MB</span>
            </div>
            <div className='text-primaryGrey font-medium text-lg'>
              {repo.owner.type === 'User'
                ? 'This repository is managed by a user.'
                : 'This repository is managed by an organization.'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepoPage;
