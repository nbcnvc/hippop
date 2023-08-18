import React from 'react';

import { useNavigate } from 'react-router-dom';
import { handleLogOut } from './Login';
const Main = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/signin');
  };

  return (
    <div>
      Main
      <div className="btns">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    </div>
  );
};

export default Main;
