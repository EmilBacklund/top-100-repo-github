import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import RepoPage from '../pages/RepoPage/RepoPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/repository/:id' element={<RepoPage />} />
    </Routes>
  );
};

export default Router;
