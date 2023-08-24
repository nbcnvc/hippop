import React, { useEffect, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import Login from '../../pages/Login';
import { UserInfo } from '../../types/types';
import { handleLogOut } from '../../pages/Login';
import { supabase } from '../../api/supabase';
import { setUserStore } from '../../store/userStore';
import { useCurrentUser } from '../../store/userStore';

function Header() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 셋 해주는 함수 가져오기
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  const currentUser = useCurrentUser();

  console.log('currentUser22', currentUser);
  useEffect(() => {
    const authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const response = await supabase.from('user').select().eq('id', session?.user.id).single();
        if (response.data) {
          setCurrentUser(response.data);
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          const userInfo: UserInfo = {
            id: session.user.id,
            created_at: session.user.created_at,
            email: session.user.user_metadata.email,
            avatar_url: session.user.user_metadata.avatar_url,
            name: session.user.user_metadata.name
          };
          await supabase.from('user').insert(userInfo);
          setCurrentUser(userInfo);
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
        }
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => {
      authSubscription.data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    if (user) {
      handleLogOut();
      setUser(null);
    } else {
      setIsModalOpen(true);
    }
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

  return (
    <HeaderTag>
      {/* <header> */}
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
          {currentUser ? (
            <>
              <div className="user-dropdown" onClick={handleMenuToggle} ref={menuRef}>
                <div className="info-mate">
                  <div className="welcome-mate">
                    <p>반갑습니다!</p>
                    <p>{currentUser.name}님</p>
                  </div>

                  {currentUser.avatar_url.startsWith('profile/') ? (
                    <img
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser.avatar_url}`}
                      alt="User Avatar"
                    />
                  ) : (
                    <img src={currentUser.avatar_url} alt="User Avatar" />
                  )}
                </div>
                <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                  <Link to="/mypage">My Page</Link>
                  <div onClick={handleToggle}>Logout</div>
                </div>
              </div>
            </>
          ) : (
            <button onClick={handleToggle}>Login</button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ModalWrapper isopen={isModalOpen} onClick={handleModalOutsideClick}>
          <Login closeModal={closeModal} />
        </ModalWrapper>
      )}
      {/* </header> */}
    </HeaderTag>
  );
}

export default Header;

const HeaderTag = styled.header`
background-color: #f24d0d;
  width: 100%;
  height: 10vh;
  border-bottom: 1px dotted gray;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // header{}
  ul {
    margin: 0 auto;
    width: 70%;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 10vw;
  }
  li{
    a {
    display: block;
    width: 100%;
    height: 100%;
    transition: filter 0.3s, transform 0.3s !important;

    &:hover {
      filter: brightness(120%) !important;
      color: gray !important;
    }

    &:active {
      transform: scale(0.85) !important;
    }
  }
}
  }
  .logo-wrapper {
    display: flex;
    align-items: center;

    .test-logo {
      width: 80px;
      
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
      width: 60px;
      height: 60px;
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

        img{
          transition: filter 0.3s, transform 0.3s;
          &:hover {
            transform: scale(0.92);
          }
          
        }
        .welcome-mate {
          margin-right: 8px;
          width: 85px;
          p {
            margin: 4px 0;
          }
        }
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

// const ModalWrapper = styled.div`
// =======
// // const Line = styled.div`
//   border-bottom: 2px dotted gray;
//   width: 100%;

//   margin-bottom: 50px;
// `;

// const Line = styled.div`
//   border-bottom: 2px dotted gray;
//   width: 100%;

//   margin-bottom: 50px;
// `;

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
