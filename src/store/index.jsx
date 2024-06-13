import { configureStore, combineReducers } from '@reduxjs/toolkit';
import githubReposSlice from './githubRepos/githubReposSlice';

const reducer = combineReducers({
  githubRepos: githubReposSlice,
});

const store = configureStore({
  reducer,
});

export default store;
