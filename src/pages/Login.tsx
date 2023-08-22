import React, { useState, useEffect } from 'react';

import { supabase } from '../api/supabase';

import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const handleLogOut = async () => {
  const { error } = await supabase.auth.signOut();

  alert('로그아웃 되었습니다.');
  if (error) console.log('error=>', error);
};

const Login = ({ closeModal, fetchUserInfo }: { closeModal: () => void; fetchUserInfo: () => Promise<void> }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const EmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const PasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const PasswordCheckChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // default login
  // const signupHandle = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateEmail(email)) {
  //     alert('이메일 형식이 올바르지 않습니다.');
  //     return;
  //   }
  //   if (password.length < 6) {
  //     alert('비밀번호는 6자리 이상이어야 합니다.');
  //     return;
  //   }
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password
  //     });
  //     console.log(data);
  //     if (error) {
  //       alert('아이디와 비밀번호를 확인해주세요');
  //       console.error(error);
  //     } else {
  //       alert('회원가입이 완료되었습니다');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //google
  const signupGoogle = async (e: React.FormEvent) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (data) alert('로그인이 완료되었습니다');
    console.log(data);
    if (error) console.error('error =>', error);
  };

  const signupKakao = async (e: React.FormEvent) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (data) alert('로그인이 완료되었습니다');
    console.log(data);
    if (error) console.error('error =>', error);
  };
  const signInWithFacebook = async (e: React.FormEvent) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (data) alert('로그인이 완료되었습니다');
    console.log(data);
    if (error) console.error('error =>', error);
  };

  // async function signInWithFacebook() {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'facebook'
  //   });
  //   if (data) alert('로그인이 완료되었습니다');
  //   console.log(data);
  //   if (error) console.error('error =>', error);
  // }

  return (
    <LoginTag>
      <div>
        <div className="login-content">
          <Link to="/">
            <img src="/asset/test-logo.png" alt="logo" width={80} />
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
        <form>
          {/* <input type="text" onChange={EmailChangeHandler} placeholder="Email" /> */}
          {/* <input type="password" onChange={PasswordChangeHandler} placeholder="Password" /> */}
          {/* <input type="password" onChange={PasswordCheckChangeHandler} placeholder="Check to Password" /> */}
        </form>
      </div>
      {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']} /> */}
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
  border-radius:10px;
  padding: 1rem;

  .login-content {
    gap:10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2{
      margin-top:10px;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      color:white;
    }
    span{
      font-size: 12px;
    }
  }
  .btn-wrapper > ul{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul > li {
    margin: 1rem;
    cursor:pointer;
    transition: transform 0.5s, filter 0.5s;
  }
  ul > li:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  ul > li > img{
    width: 45px;
  }
  }

`;
