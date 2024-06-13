import { createSlice } from '@reduxjs/toolkit';

const githubReposSlice = createSlice({
  name: 'githubRepos',
  initialState: {
    repoData: null,
    page: 1,
    rank: null,
  },
  reducers: {
    setRepoData: (state, action) => {
      state.repoData = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRank: (state, action) => {
      state.rank = action.payload;
    },
  },
});

export const { setRepoData, setPage, setRank } = githubReposSlice.actions;
export default githubReposSlice.reducer;
