import React from 'react';
// api
import { supabase } from '../../api/supabase';
//
import { Link } from 'react-router-dom';
// style
import { St } from './style/St.Login';

const Login = ({ closeModal }: { closeModal: () => void }) => {
  //google
  const signupGoogle = async (e: React.FormEvent) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });

      if (error) {
        console.error('error =>', error);
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했어요 :(', error);
    }
  };

  const signupKakao = async (e: React.FormEvent) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao'
      });

      if (error) {
        console.error('error =>', error);
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했어요 :(', error);
    }
  };

  const signupFacebook = async (e: React.FormEvent) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook'
      });

      if (error) {
        console.error('error =>', error);
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했어요 :(', error);
    }
  };

  return (
    <St.LoginTag>
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
              <div className="list" onClick={signupFacebook}>
                <img src="/asset/fblogin-horizon.png" alt="naver" />
              </div>
            </div>
          </div>
          <p>copyright by 'Our time, in that summer'</p>
        </div>
      </div>
    </St.LoginTag>
  );
};

export default Login;
