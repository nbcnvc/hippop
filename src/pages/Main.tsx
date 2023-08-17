import React from 'react';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/signin');
  };
  return (
    <div>
      Main<button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default Main;
