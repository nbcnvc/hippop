// 라이브러리
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
// api
import { supabase } from '../api/supabase';
// 타입
import { Store } from '../types/types';
// 컴포넌트
import Card from '../components/main/Card';
// style component
import { St } from './style/St.Main';
//mui
import { Masonry } from '@mui/lab';
import Skeleton from '@mui/material/Skeleton';

const PAGE_SIZE = 15;

const fetchStores = async ({ pageParam = 0 }) => {
  const { data } = await supabase
    .from('store')
    .select()
    .eq('isclosed', false)
    .range(pageParam, pageParam + PAGE_SIZE - 1);

  return data || [];
};

// next key 사용 시
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
      if (!lastPage || lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.flat().length;
    }
  });
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const allStores = storesData?.pages.flatMap((page) => page) || [];
  const header = (
    <header>
      <img src="/asset/mainBanner.png" alt="Banner-img" />
      <h4 style={{ textAlign: 'center' }}>
        <span>당신</span>에게 맞는 <span>힙한 팝업스토어</span>를 찾아보세요! XD
      </h4>
    </header>
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <St.MainContainer>
        {header}
        <Masonry columns={3} spacing={2} sx={{ maxWidth: '1920px', width: '50%', margin: '0 auto' }}>
          {Array.from({ length: PAGE_SIZE }, (_, index) => (
            <Link to="/" key={index}>
              <Skeleton variant="rectangular" width={'100%'} height={'100%'} animation="wave" />
            </Link>
          ))}
          {isFetchingNextPage && <p>Loading...</p>}
        </Masonry>
      </St.MainContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <St.MainContainer>
      {header}
      <Masonry
        columns={3}
        spacing={2}
        sx={{
          maxWidth: '1920px',
          minWidth: '764px',
          width: '50%',
          margin: '0 auto',

          '@media (max-width: 390px)': {
            width: '85%'
          }
        }}
      >
        {allStores.map((store, idx) => (
          <Link to={`detail/${store.id}`} key={idx} className="masonry-item">
            <Card store={store} />
          </Link>
        ))}
      </Masonry>
      <div
        style={{
          backgroundColor: 'transparent',
          width: '90%',
          border: 'none',
          padding: '20px',
          margin: '10px'
        }}
        ref={ref}
      ></div>
    </St.MainContainer>
  );
};

export default Main;
