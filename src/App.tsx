import './App.css';
import React, { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { supabase } from './api/supabase';
import { setUserStore, useCurrentUser } from './store/userStore';

const queryClient = new QueryClient();

function App() {
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);

  const currentUser = useCurrentUser();
  console.log('currentUser', currentUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && !currentUser) {
        const { data } = await supabase.from('user').select(`*`).eq('id', session?.user.id).single();

        if (data) {
          setCurrentUser(data);
        }

        if (event === 'SIGNED_IN' && !currentUser) {
          const user = {
            id: session?.user.id,
            created_at: session?.user.created_at,
            email: session?.user.user_metadata.email,
            avatar_url: session?.user.user_metadata.avatar_url,
            name: session?.user.user_metadata.name
          };

          await supabase.from('user').insert(user);

          const { data } = await supabase.from('user').select(`*`).eq('id', session?.user.id).single();

          setCurrentUser(data);
        }
      }
      if (event === 'SIGNED_OUT' && currentUser) {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
