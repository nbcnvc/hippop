import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import Community from '../pages/Community';
import About from '../pages/About';
import Header from '../components/common/Header';
import Contact from '../pages/Contact';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/auth/signin" element={<Login />} /> */}
        {/* <Route path="/mypage/:id" element={<MyPage />} /> */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
