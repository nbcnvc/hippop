import React, { useState, useRef, useEffect } from 'react';
// 라이브러리
import { Link, useNavigate } from 'react-router-dom';
import Login from '../auth/Login';
import { useCurrentUser } from '../../store/userStore';
import Alarm from './Alarm';
import AlarmBox from './AlarmBox';
import { supabase } from '../../api/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import shortid from 'shortid';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// zustand store
// api
import { getUser } from '../../api/user';
import { getAlarms, readAlarm } from '../../api/alarm';
// style component
import { St } from './style/St.Header';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const alarmRef = useRef<HTMLDivElement | null>(null);

  // 유저 셋 해주는 함수 가져오기
  // const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const { data: user } = useQuery(['user', currentUserId], () => getUser(currentUserId ?? ''));
  // 알림 데이터 가져오기
  const { data: alarms, isLoading, isError } = useQuery(['alarms'], () => getAlarms(currentUserId ?? ''));
  const readAlarms = alarms?.filter((alarm) => alarm.isRead === false);

  const queryClient = useQueryClient();
  const readAlarmMutation = useMutation(readAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(['alarms']);
    }
  });

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      // 클릭한 요소가 메뉴나 관련된 요소가 아닌 경우에만 메뉴 닫기
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
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

  const navigate = useNavigate();
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('error=>', error);
    } else {
      toast.info('안녕히가세요 ! :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      navigate('/');
    }
  };

  useEffect(() => {
    const handleAlarmWindowClick = (event: MouseEvent) => {
      if (!alarmRef.current?.contains(event.target as Node)) {
        setIsAlarmOpen(false);
      }
    };

    window.addEventListener('click', handleAlarmWindowClick);
    return () => {
      window.removeEventListener('click', handleAlarmWindowClick);
    };
  }, []);

  // 종 클릭 시 알람 목록(그럼 기준을 currentUserId...?)에 있는 isRead가 false -> true로 바뀌어야 함
  const handleToggleAlarm = () => {
    if (isAlarmOpen === false) {
      setIsAlarmOpen(!isAlarmOpen);

      const readAlarms = alarms?.map((alarm) => ({ ...alarm, isRead: true }));

      readAlarmMutation.mutate(readAlarms);
    }
  };

  if (isLoading) {
    return (
      <div>
        <St.HeaderTag>
          <div className="header-wrapper">
            <Alarm />
            <div className="logo-wrapper">
              <Link to="/">
                <img src="/asset/nyb_logo.png" className="nyb-logo" alt="nyb-img" />
              </Link>
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
                    <div className="user-dropdown" onClick={handleMenuToggle} ref={menuRef}>
                      <div className="info-mate">
                        <div className="welcome-mate">
                          <p>Hello,</p>
                          <p>{user.name}님</p>
                        </div>
                        {user.avatar_url && (
                          <img
                            src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user.avatar_url}`}
                            alt="User Avatar"
                          />
                        )}
                      </div>
                      <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                        <div
                          onClick={() => {
                            navigate(`/mypage/${shortid.generate()}`, { state: { userId: user.id } });
                          }}
                        >
                          My Page
                        </div>
                        <div onClick={handleLogOut}>Logout</div>
                      </div>
                    </div>
                    <div className="alarm" ref={alarmRef}>
                      <St.AlarmButton onClick={handleToggleAlarm} />
                      {readAlarms && readAlarms?.length > 0 && (
                        <img src="/asset/headLight.png" alt="Alarm headLight image" />
                      )}
                      {isAlarmOpen && <ul>{/* <AlarmBox alarms={alarms} /> */}</ul>}
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
              {isModalOpen && (
                <St.ModalWrapper isopen={isModalOpen} onClick={handleModalOutsideClick}>
                  <Login closeModal={closeModal} />
                </St.ModalWrapper>
              )}
            </div>
          </div>
        </St.HeaderTag>
        );
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <St.HeaderTag>
      <div className="header-wrapper">
        <Alarm />
        <div className="logo-wrapper">
          <Link to="/">
            <img src="/asset/nyb_logo.png" className="nyb-logo" alt="nyb-img" />
          </Link>
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
                <div className="user-dropdown" onClick={handleMenuToggle} ref={menuRef}>
                  <div className="info-mate">
                    <div className="welcome-mate">
                      <p>Hello,</p>
                      <p>{user.name}님</p>
                    </div>
                    {user.avatar_url && (
                      <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user.avatar_url}`} alt="User Avatar" />
                    )}
                  </div>
                  <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <div
                      onClick={() => {
                        navigate(`/mypage/${shortid.generate()}`, { state: { userId: user.id } });
                      }}
                    >
                      My Page
                    </div>
                    <div onClick={handleLogOut}>Logout</div>
                  </div>
                </div>
                <div className="alarm" ref={alarmRef}>
                  <St.AlarmButton onClick={handleToggleAlarm} />
                  {readAlarms && readAlarms?.length > 0 && (
                    <img src="/asset/headLight.png" alt="Alarm headLight image" />
                  )}
                  {isAlarmOpen && (
                    <ul>
                      <AlarmBox alarms={alarms} />
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <button onClick={openLoginModal}>Login</button>
            )}
          </div>
          {isModalOpen && (
            <St.ModalWrapper isopen={isModalOpen} onClick={handleModalOutsideClick}>
              <Login closeModal={closeModal} />
            </St.ModalWrapper>
          )}
        </div>
      </div>
    </St.HeaderTag>
  );
}
export default Header;
