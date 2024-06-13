import axios from 'axios';

const fetchRepositories = async (options) => {
  const GITHUB_API_URL = 'https://api.github.com/search/repositories';

  let GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      params: {
        q: options.q,
        sort: options.sort,
        order: options.order,
        page: options.page,
        per_page: options.per_page,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchRepositories;
