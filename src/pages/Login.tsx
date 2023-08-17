import React, { useState, useEffect } from 'react';

import { supabase } from '../api/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Button from '@mui/material/Button';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  // <Auth
  // supabaseClient<any,"public",any>={supabase}
  // appearance={{theme: ThemeSupa}}
  // providers={["google"]}
  // />
  const EmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const PasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const PasswordCheckChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const signupHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      console.log(data);
      if (error) {
        console.error(error);
        alert('아이디와 비밀번호를 확인해주세요');
      } else {
        alert('회원가입이 완료되었습니다');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input type="text" onChange={EmailChangeHandler} />
      <input type="password" onChange={PasswordChangeHandler} />
      <input type="password" onChange={PasswordCheckChangeHandler} />
      <div>
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={
            signupHandle
            // loginHandler(e);
            // resetField(e);
          }
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
