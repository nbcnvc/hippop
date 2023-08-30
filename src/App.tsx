import './App.css';
import React, { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { supabase } from './api/supabase';
import { setUserStore, useCurrentUser } from './store/userStore';
import TopButton from './components/common/TopButton';

const queryClient = new QueryClient();

function App() {
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  const currentUser = useCurrentUser();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && !currentUser) {
        const response = await supabase.from('user').select(`*`).eq('id', session?.user.id);
        if (response.data) {
          setCurrentUser(response.data[0]);
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
          setCurrentUser(user);
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
