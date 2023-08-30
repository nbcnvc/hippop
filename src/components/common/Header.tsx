import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Login from '../../pages/Login';
import { UserInfo } from '../../types/types';
import { setUserStore, useCurrentUser } from '../../store/userStore';
import Alarm from './Alarm';
import AlarmBox from './AlarmBox';
import { supabase } from '../../api/supabase';
import { User } from '@supabase/supabase-js';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/user';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 유저 셋 해주는 함수 가져오기
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const { data: user } = useQuery(['user', currentUserId], () => getUser(currentUserId ?? ''));

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('error=>', error);
    } else {
      navigate('/');
      alert(':) 안녕히가세요 !');
    }
  };

  const ToggleAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
  };

  return (
    <HeaderTag>
      <div className="header-wrapper">
        <Alarm />
        <div className="logo-wrapper">
          <Link to="/">
            <img src="/asset/test-logo1.png" className="test-logo" alt="test-img" />
          </Link>
          Find your Hippop
        </div>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/review">Review</Link>
          </li>
          <li>
            <Link to="/mate">Mate</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
        <div>
          <div className="user-info">
            {user ? (
              <>
                <AlarmButton onClick={ToggleAlarm} />
                <ul style={{ position: 'relative' }}>{isAlarmOpen && <AlarmBox />}</ul>
                <div className="user-dropdown" onClick={handleMenuToggle} ref={menuRef}>
                  <div className="info-mate">
                    <div className="welcome-mate">
                      <p>반갑습니다!</p>
                      <p>{user.name}님</p>
                    </div>
                    {user.avatar_url && user.avatar_url.startsWith('profile/') ? (
                      <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user.avatar_url}`} alt="User Avatar" />
                    ) : (
                      <img src={user.avatar_url} alt="User Avatar" />
                    )}
                  </div>
                  <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <Link to={`/mypage/${user.id}`}>My Page</Link>
                    <div onClick={handleLogOut}>Logout</div>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={openLoginModal}>Login</button>
            )}
          </div>
          {isModalOpen && (
            <ModalWrapper isopen={isModalOpen} onClick={handleModalOutsideClick}>
              <Login closeModal={closeModal} />
            </ModalWrapper>
          )}
        </div>
      </div>
    </HeaderTag>
  );
}
export default Header;
const HeaderTag = styled.header`
  background-color: #f24d0d;
  color: white;
  width: 100%;
  height: 50px;
  .header-wrapper {
    height: 50px;
    margin: 0 auto;
    width: 50%;
    display: flex;
    align-items: center;
    ul {
      margin: 0 auto;
      margin-right: 20px;
      width: 70%;
      text-align: center;
      display: flex;
      justify-content: flex-end;
      gap: 40px;
    }
    li {
      a {
        color: white;
        display: block;
        width: 100%;
        height: 100%;
        transition: filter 0.3s, transform 0.3s !important;
        &:hover {
          filter: brightness(120%) !important;
          color: #f8aa7d !important;
        }
        &:active {
          transform: scale(0.92) !important;
        }
      }
    }
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    .test-logo {
      width: 40px;
      transition: filter 0.3s, transform 0.3s;
      &:hover {
        filter: brightness(120%);
        transform: scale(0.92);
      }
    }
  }
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
    .user-dropdown {
      position: relative;
      cursor: pointer;
      .info-mate {
        display: flex;
        align-items: center;
        text-align: right;
        img {
          transition: filter 0.3s, transform 0.3s;
          &:hover {
            transform: scale(0.92);
          }
        }
        .welcome-mate {
          margin-right: 8px;
          width: 85px;
          p {
            font-size: 10px;
            margin: 4px 0;
          }
        }
      }
      .welcome-mate p:last-child {
        font-weight: 600;
      }
      .dropdown-content {
        position: absolute;
        bottom: -70px;
        right: 0;
        width: 120px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        display: none;
        z-index: 1;
        a,
        div {
          display: block;
          padding: 8px 10px;
          text-align: center;
          text-decoration: none;
          color: #333;
          &:hover {
            background-color: #f1f1f1;
          }
        }
      }
    }
  }
`;

const ModalWrapper = styled.div.attrs<{ isopen: boolean }>((props) => ({
  style: {
    transform: props.isopen ? 'translateY(0)' : 'translateY(100%)'
  }
}))<{ isopen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const AlarmButton = styled(NotificationsIcon)`
  cursor: pointer;
`;
