import './App.css';
import React, { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { supabase } from './api/supabase';
import { setUserStore, useCurrentUser } from './store/userStore';
import { randomFileName } from './hooks/useHandleImageName';

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
          // const imageUrl = session?.user.user_metadata.avatar_url
          async function uploadImageToStorage(imageUrl: any) {
            try {
              // 이미지 URL을 사용하여 이미지를 다운로드
              const response = await fetch(imageUrl);
              const blob = await response.blob();

              // 파일 이름 생성 (예: 랜덤 파일 이름)
              const newImg = randomFileName(imageUrl);

              // Blob을 File 객체로 변환
              const renamedImg = new File([blob], newImg);

              // Storage에 이미지 업로드
              const { data } = await supabase.storage.from('images').upload(`profile/${newImg}`, renamedImg);

              if (data) {
                const imgUrl = data.path;
              }

              return `profile/${newImg}`;
            } catch (error) {
              console.error('이미지 업로드 오류:', error);
              return null;
            }
          }

          // 이미지 업로드 함수 호출
          const imageUrl = session?.user.user_metadata.avatar_url;
          if (imageUrl) {
            const uploadedImageUrl = await uploadImageToStorage(imageUrl);

            if (uploadedImageUrl) {
              // 업로드 된 이미지 URL을 사용하여 사용자 정보 업데이트 등의 작업 수행
              const user = {
                id: session?.user.id,
                created_at: session?.user.created_at,
                email: session?.user.user_metadata.email,
                avatar_url: uploadedImageUrl,
                name: session?.user.user_metadata.name
              };
              await supabase.from('user').insert(user);
              setCurrentUser(user);
            }
          }
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
