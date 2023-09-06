import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Masonry } from '@mui/lab';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { supabase } from '../api/supabase';
import { Store } from '../types/types';
import Card from '../components/list/Card';
import Skeleton from '@mui/material/Skeleton';
import { useInView } from 'react-intersection-observer';

const PAGE_SIZE = 5;

const fetchStores = async ({ pageParam = 0 }) => {
  const { data } = await supabase
    .from('store')
    .select()
    // .order('period_start', { ascending: false }) // 내림차순
    .range(pageParam, pageParam + PAGE_SIZE - 1);
  return data || [];
};

const Main = () => {
  const {
    data: storesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery<Store[][], Error, Store[], [string]>(['stores'], fetchStores, {
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.flat().length;
    }
  });

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allStores = storesData?.pages.flatMap((page) => page) || [];

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView) => {}
  });

  if (isLoading) {
    // 로딩 중일 때 스켈레톤을 렌더링합니다.
    return (
      <MainContainer>
        <header>
          <img src="/asset/mainBanner.png" alt="Banner-img" />
          <h4 style={{ textAlign: 'center' }}>
            <span>당신</span>에게 맞는 <span>힙한 팝업스토어</span>를 찾아보세요! XD
          </h4>
        </header>
        <Masonry columns={3} spacing={2} sx={{ maxWidth: '1920px', width: '50%', margin: '0 auto' }}>
          {Array.from({ length: PAGE_SIZE }, (_, index) => (
            <Link to="/" key={index}>
              {/* <Link to="/" key={index} ref={index === PAGE_SIZE - 1 ? observerRef : null}> */}
              <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
            </Link>
          ))}
          {isFetchingNextPage && <p>Loading...</p>}
        </Masonry>
        <div></div>
      </MainContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <MainContainer>
      <header>
        <img src="/asset/mainBanner.png" alt="Banner-img" />
        <h4 style={{ textAlign: 'center' }}>
          <span>당신</span>에게 맞는 <span>힙한 팝업스토어</span>를 찾아보세요! XD
        </h4>
      </header>
      <Masonry columns={3} spacing={2} sx={{ maxWidth: '1920px', width: '50%', margin: '0 auto' }}>
        {allStores.map((store, index) => (
          <Link to={`detail/${store.id}`} key={store.id}>
            <Card store={store} />
          </Link>
        ))}
        {isFetchingNextPage && <p>Loading...</p>}
      </Masonry>
      <div
        style={{
          backgroundColor: 'transparent',
          width: '90%',
          border: 'none',
          padding: '20px',
          margin: '10px'
        }}
        ref={observerRef}
      />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    margin: 8rem 8rem 12rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      margin: 0 auto;
      max-width: 1400px;
      width: 60%;
      transition: filter 0.3s ease;
      &:hover {
        filter: brightness(1.4);
      }
    }
    h4 {
      font-size: 1.1vw;
      margin-top: 2rem;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(0.98);
      }
    }
    span {
      font-size: 1.5vw;
      color: var(--primary-color);
    }
  }
`;
