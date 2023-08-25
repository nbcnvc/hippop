import React, { useEffect, useState } from 'react';

import { UserInfo } from '../types/types';

import { useNavigate } from 'react-router-dom';
import { handleLogOut } from './Login';
import Search from './Search';
import { styled } from 'styled-components';
import Alarm from '../components/common/Alarm';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('sb-jlmwyvwmjcanbthgkpmh-auth-token');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const { id, created_at, email, name, avatar_url } = userData.user.user_metadata;
      setUser({ id, created_at, email, name, avatar_url });
    }
  }, []);

  const handleToggle = () => {
    if (user) {
      handleLogOut();
      setUser(null);
    } else {
      navigate('/auth/signin');
    }
  };

  return (
    <HeaderTag>
      <div className="logo-wrapper">
        <img src="/asset/test-logo.png" className="test-logo" />
        Header tap
      </div>
      <Search />
      <div>About</div>
      <div>Detail</div>
      <div>Community</div>
      <div>Contract</div>
      <div>
        <div className="user-info">
          {user && (
            <>
              <p>{user.name}</p>
              <img src={user.avatar_url} alt="User Avatar" />
            </>
          )}
          <button onClick={handleToggle}>{user ? 'Logout' : 'Login'}</button>
        </div>
      </div>
    </HeaderTag>
  );
}

export default Header;

const HeaderTag = styled.header`
  width: 100%;
  height: 10vh;
  border: 1px dotted gray;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-wrapper {
    display: flex;
    align-items: center;

    .test-logo {
      width: 80px;
    }
  }
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60px;
      border-radius: 50%;
    }
  }
`;
