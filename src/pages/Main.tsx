import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Masonry } from '@mui/lab';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { supabase } from '../api/supabase';
import { Store } from '../types/types';
import Card from '../components/list/Card';

const PAGE_SIZE = 5;

const fetchStores = async ({ pageParam = 0 }) => {
  const { data } = await supabase
    .from('store')
    .select()
    .range(pageParam, pageParam + PAGE_SIZE - 1);
  return data || [];
};

const Main = () => {
  const {
    data: storesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
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

  return (
    <MainContainer>
      <h4>당신에게 맞는 힙한 팝업스토어를 찾아보세요! xD</h4>
      <Masonry columns={3} spacing={2} sx={{ width: '60%', margin: '0 auto' }}>
        {allStores.map((store, index) => (
          <Link to={`detail/${store.id}`} key={store.id} ref={index === allStores.length - 1 ? observerRef : null}>
            <Card store={store} />
          </Link>
        ))}
        {isFetchingNextPage && <p>Loading...</p>}
      </Masonry>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
