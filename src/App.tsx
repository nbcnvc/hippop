import './App.css';
import React, { useEffect } from 'react';
// Router
import Router from './shared/Router';
// GlobalStyle
import GlobalStyle from './GlobalStyle';
// 라이브러리
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
// api
import { supabase } from './api/supabase';
// zustand
import { setUserStore, useCurrentUser } from './store/userStore';
// hook
import { randomFileName } from './hooks/useHandleImageName';

const queryClient = new QueryClient();

function App() {
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);

  const currentUser = useCurrentUser();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && !currentUser) {
        const { data } = await supabase.from('user').select(`*`).eq('id', session?.user.id).single();
        if (data) {
          setCurrentUser(data);
        }

        const token: any = localStorage.getItem('sb-zqiwmgmvarclaeheitdx-auth-token');
        const parsedToken = JSON.parse(token);
        const provider = parsedToken.user.app_metadata.provider;

        if (event === 'SIGNED_IN' && !currentUser) {
          const uploadImageToStorage = async (imageUrl: any) => {
            try {
              // provider가 kakao일 때
              if (provider === 'kakao') {
                const profileResponse = await axios.get('https://kapi.kakao.com/v1/api/talk/profile', {
                  headers: {
                    Authorization: `Bearer ${parsedToken?.provider_token}`
                  }
                });

                // 이미지 URL을 사용하여 이미지를 다운로드
                const response = await fetch(`${profileResponse.data.profileImageURL}`); // 서버의 엔드포인트를 호출하여 이미지 다운로드

                if (!response.ok) {
                  throw new Error('이미지 다운로드 실패');
                }

                const blob = await response.blob();

                // 파일 이름 생성 (예: 랜덤 파일 이름)
                const newImg = randomFileName(imageUrl);

                // Blob을 File 객체로 변환
                const renamedImg = new File([blob], newImg);

                // Storage에 이미지 업로드
                const { data, error } = await supabase.storage.from('images').upload(`profile/${newImg}`, renamedImg);

                return data?.path;
              }
              // provider가 google이나 facebook일 때
              else if (provider === 'google' || provider === 'facebook') {
                // 이미지 URL을 사용하여 이미지를 다운로드
                const response = await fetch(`${imageUrl}`); // 서버의 엔드포인트를 호출하여 이미지 다운로드

                if (!response.ok) {
                  throw new Error('이미지 다운로드 실패');
                }

                const blob = await response.blob();

                // 파일 이름 생성 (예: 랜덤 파일 이름)
                const newImg = randomFileName(imageUrl);

                // Blob을 File 객체로 변환
                const renamedImg = new File([blob], newImg);

                // Storage에 이미지 업로드
                const { data, error } = await supabase.storage.from('images').upload(`profile/${newImg}`, renamedImg);

                return data?.path;
              }
            } catch (error) {
              console.error('이미지 업로드 오류 : ', error);
              return null;
            }
          };

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

              const { data } = await supabase.from('user').select(`*`).eq('id', session?.user.id).single();

              if (data) {
                setCurrentUser(data);
              }
            }
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' && currentUser) {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

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
