import React, { useEffect } from 'react';

import { supabase } from '../api/supabase';

import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { randomFileName } from '../hooks/useHandleImageName';
import { setUserStore } from '../store/userStore';

// export const handleLogOut = async () => {
//   const { error } = await supabase.auth.signOut();

//   if (error) console.log('error=>', error);
// };

const Login = ({ closeModal }: { closeModal: () => void }) => {
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);

  //google
  const signupGoogle = async (e: React.FormEvent) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
    if (data) alert('로그인이 완료되었습니다');
    console.log(data);
    if (error) console.error('error =>', error);
  };

  const signupKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao'
    });
    if (data) alert('로그인이 완료되었습니다');
    console.log(data);
    if (error) console.error('error =>', error);
  };

  const signInWithFacebook = async (e: React.FormEvent) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook'
    });

    // const newFileName = randomFileName(selectedImage.name);
    // const renamedFile = new File([selectedImage], newFileName);

    // const { data } = await supabase.storage.from('images').upload(`profile/${renamedFile.name}`, renamedFile);

    if (data) alert('로그인이 완료되었습니다');
    console.log(data);
    if (error) console.error('error =>', error);
  };

  return (
    <LoginTag>
      <div>
        <div className="login-content">
          <Link to="/">
            <img src="/asset/nyb_logo.png" alt="logo" width={220} />
          </Link>
          <h2>Find your HipPop</h2>
          <span>힙-팝에 오신걸 환영해요 :)</span>
          <div className="btn-wrapper">
            <div className="list-wrapper">
              <div className="list" onClick={signupGoogle}>
                <img src="/asset/gglogin-horizon.png" alt="google" />
              </div>
              <div className="list" onClick={signupKakao}>
                <img src="/asset/kakao-horizon.png" alt="kakao" />
              </div>
              <div className="list" onClick={signInWithFacebook}>
                <img src="/asset/fblogin-horizon.png" alt="naver" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginTag>
  );
};

export default Login;

const LoginTag = styled.div`
  margin: 0 auto;
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 520px;
  background: rgba(183, 79, 231, 0.76);
  border-radius: 10px;
  padding: 1rem;
  // backdrop-filter: blur(10px);
  box-shadow: 4px 4px 18px rgba(0, 0, 0, 0.3);

  .login-content {
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      margin-top: 10px;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      color: white;
    }
    span {
      font-size: 12px;
    }
  }
  .btn-wrapper {
    width: 100%;
  }
  .list-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px !important;
  }
  .list {
    margin: 0.5rem;
    cursor: pointer;
    transition: transform 0.5s, filter 0.5s;
  }
  .list:hover {
    transform: scale(0.98);
    filter: brightness(1.2);
  }
  .list > img {
    width: 200px;
    border-radius: 8px;
  }
`;
