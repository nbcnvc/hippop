import './App.css';
import React, { useEffect, useState } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { setUserStore } from './store/userStore';
import { supabase } from './api/supabase';
import { UserInfo } from './types/types';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
