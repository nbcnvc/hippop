import React, { useState, useEffect } from 'react';

import { supabase } from '../api/supabase';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { styled } from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const classes = useStyles();

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

  const signupHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (password.length < 6) {
      alert('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      console.log(data);
      if (error) {
        alert('아이디와 비밀번호를 확인해주세요');
        console.error(error);
      } else {
        alert('회원가입이 완료되었습니다');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginTag>
      <div>
        <form>
          <h2>Welcome to HipPop</h2>
          <input type="text" onChange={EmailChangeHandler} placeholder="Email" />
          <input type="password" onChange={PasswordChangeHandler} placeholder="Password" />
          <input type="password" onChange={PasswordCheckChangeHandler} placeholder="Check to Password" />

          <Button variant="contained" href="#contained-buttons" className={classes.customButton} onClick={signupHandle}>
            Login
          </Button>
        </form>
      </div>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']} />
    </LoginTag>
  );
};

export default Login;

const LoginTag = styled.div`
  margin: 0 auto;

  width: 40vw;
  height: 25vh;
  background: #f0b07b;
  padding: 1rem;
  margin-top: 20%;
  div {
    display: flex;
    justify-content: center;
    h2 {
      text-align: center;
      font-weight: 600;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    input {
      width: 20vw;
      margin: 10px 0;
      border: none;
      border-radius: 4px;
    }
    a {
      margin: 0 auto;
    }
  }
`;

// const Button = styled.button`

// `;

const useStyles = makeStyles((theme) => ({
  customButton: {
    width: '10vw',
    margin: '0 auto',
    backgroundColor: 'purple',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkpurple'
    }
  }
}));
