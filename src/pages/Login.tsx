import React, { useEffect } from 'react';

import { supabase } from '../api/supabase';

import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { setUserStore } from '../store/userStore';
import { UserInfo } from '../types/types';

const Login = ({ closeModal }: { closeModal: () => void }) => {
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);

  console.log('setCurrentUser', setCurrentUser);
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
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     console.log('session ==> ,', session);

  //     if (session) {
  //       const user = {
  //         id: session.user.id,
  //         created_at: session.user.created_at,
  //         email: session.user.user_metadata.email,
  //         avatar_url: session.user.user_metadata.avatar_url,
  //         name: session.user.user_metadata.name
  //       };

  //       setCurrentUser(user);

  //       await supabase.from('user').insert(user);
  //     } else {
  //       setCurrentUser(null);
  //     }

  //     if (session) {
  //       const response = await supabase.from('user').select().eq('userid', session?.user.id).single();

  //       if (response.data) {
  //         setCurrentUser(response.data);
  //       }
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     const response = await supabase.from('user').select().eq('userid', session?.user.id).single();
  //     console.log('res data', response.data);
  //     if (session) {
  //       const response = await supabase.from('user').select().eq('userid', session?.user.id).single();
  //       console.log('res data', response.data);
  //       if (response.data) {
  //         setCurrentUser(response.data);
  //       } else {
  //         const user = {
  //           id: session.user.id,
  //           created_at: session.user.created_at,
  //           email: session.user.user_metadata.email,
  //           avatar_url: session.user.user_metadata.avatar_url,
  //           name: session.user.user_metadata.name
  //         };
  //         setCurrentUser(user);
  //         await supabase.from('user').insert(user);
  //       }
  //     } else setCurrentUser(null);
  //   });
  // }, []);

  return (
    <LoginTag>
      <div>
        <div className="login-content">
          <Link to="/">
            <img src="/asset/test-logo1.png" alt="logo" width={80} />
          </Link>
          <h2>Find your HipPop</h2>
          <span>힙-팝에 오신걸 환영해요 :)</span>
          <div className="btn-wrapper">
            <ul>
              <li onClick={signupGoogle}>
                <img src="/asset/google.png" alt="google" />
              </li>
              <li onClick={signupKakao}>
                <img src="/asset/kakao.png" alt="kakao" />
              </li>
              <li onClick={signInWithFacebook}>
                <img src="/asset/facebook.png" alt="naver" />
              </li>
            </ul>
          </div>
        </div>
        <form></form>
      </div>
    </LoginTag>
  );
};

export default Login;

const LoginTag = styled.div`
  margin: 0 auto;
  margin-bottom: 10%;

  width: 280px;
  height: 220px;
  background: rgba(183, 79, 231, 0.76);
  border-radius: 10px;
  padding: 1rem;

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
  .btn-wrapper > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 !important;
  }
  ul > li {
    margin: 1rem;
    cursor: pointer;
    transition: transform 0.5s, filter 0.5s;
  }
  ul > li:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  ul > li > img {
    width: 45px;
  }
`;
