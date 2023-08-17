import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Search from "../pages/Search";
import Community from "../pages/Community";
import About from "../pages/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
