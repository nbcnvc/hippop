import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Masonry } from '@mui/lab';
import { useInfiniteQuery } from '@tanstack/react-query';

import { supabase } from '../api/supabase';
import { Store } from '../types/types';
import Card from '../components/list/Card';
import AlarmBox from '../components/common/AlarmBox';

const PAGE_SIZE = 10;

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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <AlarmBox />
      <Masonry columns={3} spacing={2}>
        {storesData?.pages
          .flatMap((page) => page)
          .map((store) => (
            <Link to={`detail/${store.id}`} key={store.id}>
              <Card store={store} />
            </Link>
          ))}
        {isFetchingNextPage && <p>Loading...</p>}
      </Masonry>
    </>
  );
};

export default Main;
