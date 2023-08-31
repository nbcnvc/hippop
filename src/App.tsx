import './App.css';
import React, { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TopButton from './components/common/TopButton';

function App() {
  const queryClient = new QueryClient();

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
