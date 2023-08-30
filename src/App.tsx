import './App.css';
import React, { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TopButton from './components/common/TopButton';
import { supabase } from './api/supabase';
import { setUserStore, useCurrentUser } from './store/userStore';

function App() {
  const queryClient = new QueryClient();
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  const currentUser = useCurrentUser();

  console.log('currentUser', currentUser);

  // if (session && !response.data) {
  //   await supabase.from('user').insert({
  //     id: session.user.id,
  //     created_at: session.user.created_at,
  //     email: session.user.user_metadata.email,
  //     avatar_url: session.user.user_metadata.avatar_url,
  //     name: session.user.user_metadata.name
  //   });

  //   setCurrentUser({
  //     id: session.user.id,
  //     created_at: session.user.created_at,
  //     email: session.user.user_metadata.email,
  //     avatar_url: session.user.user_metadata.avatar_url,
  //     name: session.user.user_metadata.name
  //   });
  // }

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('event => ', event);
      console.log('subscription => ', subscription);

      if (event === 'SIGNED_IN' && !currentUser) {
        console.log('------------------------');
        console.log('event => ', event);
        console.log('session => ', session);
        console.log('------------------------');

        const response = await supabase.from('user').select(`*`).eq('id', session?.user.id);

        console.log('response => ', response);

        let id, avatar_url, email, name, created_at;

        if (session && response.data) {
          id = response.data[0].id;
          avatar_url = response.data[0].avatar_url;
          email = response.data[0].email;
          name = response.data[0].name;
          created_at = response.data[0].created_at;
        }

        setCurrentUser({
          id,
          avatar_url,
          email,
          name,
          created_at
        });
      } else if (event === 'SIGNED_OUT') {
        console.log('로그아웃 감지!');
      }
    });

    return () => subscription.unsubscribe();
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
