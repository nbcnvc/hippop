import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Login from '../../pages/Login';
import { UserInfo } from '../../types/types';
import { setUserStore, useCurrentUser } from '../../store/userStore';
import Alarm from './Alarm';
import AlarmBox from './AlarmBox';
import { supabase } from '../../api/supabase';
import { User } from '@supabase/supabase-js';

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 유저 셋 해주는 함수 가져오기
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  const currentUser = useCurrentUser();

  console.log('currentUser', currentUser);

  // useEffect(() => {
  //   const authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
  //     const response = await supabase.from('user').select().eq('id', session?.user.id).single();

  //     setCurrentUser(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   setUser(currentUser);
  // }, [currentUser]);

  console.log('user', user);
  // useEffect(() => {
  //   function handleOutsideClick(event: MouseEvent) {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsMenuOpen(false);
  //     }
  //   }

  //   window.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     window.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);

  useEffect(() => {
    if (currentUser) {
      return;
    } else {
      const tokenKey = localStorage.getItem('sb-jlmwyvwmjcanbthgkpmh-auth-token');
      const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;

      const userId = parsedToken?.user.id;
      const userName = parsedToken?.user.user_metadata.name;
      const userEmail = parsedToken?.user.email;
      const userCreateAt = parsedToken?.user.created_at;
      const userAvatar_url = parsedToken?.user.user_metadata.avatar_url;
      const userInsertData = {
        id: userId,
        created_at: userCreateAt,
        email: userEmail,
        avatar_url: userAvatar_url,
        name: userName
      };

      setCurrentUser(userInsertData);
    }
  }, []);

  // 생성한 토큰 가져와서 새로고침 방지
  useEffect(() => {
    const storedUserData = localStorage.getItem('UserStorage');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }
  }, []);

  // 현재 유저의 정보 가져오기!!
  const checkUser = async () => {
    const { data: userData, error } = await supabase.auth.getUser();
    if (error) {
      // Handle the error if needed
      console.error('Error fetching user data:', error);
      return;
    }
    console.log('userDa', userData);

    if (userData) {
      setUser(userData as any); // Explicit cast to User
    } else {
      setUser(null);
    }
  };

  // window.addEventListener('hashchange' =>브라우저의 URL 해시(예: # 뒤의 일부)가 변경될 때 발생!
  // 의존성 배열을 빈 배열([])을 전달했기 때문에, 컴포넌트가 처음 렌더링될 때 한 번만 실행되며, 이후에는 의존성 변경 없이는 다시 실행되지 않음
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function () {
      checkUser();
    });
  }, []);

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

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem('UserStorage');
    setCurrentUser(null);
    alert('로그아웃 되었습니다.');
    if (error) console.log('error=>', error);
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
            {currentUser !== null ? (
              <>
                <div className="user-dropdown" onClick={handleMenuToggle} ref={menuRef}>
                  <div className="info-mate">
                    <div className="welcome-mate">
                      <p>반갑습니다!</p>
                      <p>{currentUser.name}님</p>
                    </div>
                    <AlarmBox />
                    {currentUser && currentUser?.avatar_url && currentUser.avatar_url?.startsWith('profile/') ? (
                      <img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser?.avatar_url}`}
                        alt="User Avatar"
                      />
                    ) : (
                      <img src={currentUser?.avatar_url} alt="User Avatar" />
                    )}
                  </div>
                  <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <Link to="/mypage">My Page</Link>
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
  height: 5vh;
  .header-wrapper {
    height: 5vh;
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      margin: 0 auto;
      width: 70%;
      text-align: center;
      display: flex;
      justify-content: center;
      gap: 10vw;
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
