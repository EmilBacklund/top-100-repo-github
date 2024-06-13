import axios from 'axios';

const fetchSingleRepo = async (repoId) => {
  const GITHUB_API_URL = `https://api.github.com/repositories/${repoId}`;

  let GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchSingleRepo;
