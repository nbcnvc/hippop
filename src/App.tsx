import './App.css';
import React, { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TopButton from './components/common/TopButton';
import { supabase } from './api/supabase';
import { setUserStore } from './store/userStore';
function App() {
  const queryClient = new QueryClient();
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('로그인 감지!');
        console.log('------------------------');
        console.log('event => ', event);
        console.log('session => ', session);
        console.log('------------------------');
        const response = await supabase.from('user').select(`*`).eq('id', session?.user.id);
        console.log('response => ', response);

        let id, avatar_url, email, name, created_at;
        if (response.data) {
          id = response.data[0].id;
          avatar_url = response.data[0].avatar_url;
          email = response.data[0].email;
          name = response.data[0].name;
          created_at = response.data[0].created_at;
        }

        console.log('id', id);
        console.log('avatar_url', avatar_url);
        console.log('email', email);
        console.log('name', name);
        console.log('createdAt', created_at);

        // (1) Zustand 사용 전 localStorage
        // localStorage.setItem('userName', response.data ? response.data[0].name : '');

        // (2) Zustand에 담기
        setCurrentUser({
          id,
          avatar_url,
          email,
          name,
          created_at
        });
      } else if (event === 'SIGNED_OUT') {
        console.log('로그아웃 감지!');
        // localStorage.removeItem('userName');
      }
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <TopButton />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
