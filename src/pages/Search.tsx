import React from 'react';
import SearchList from '../components/search/SearchList';
import { Store } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchStoreData } from '../api/store';

const Search = () => {
  // store 전체 조회
  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store[] | null>({
    queryKey: ['storeData'],
    queryFn: () => fetchStoreData()
  });

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return <div>{storeData && <SearchList storeData={storeData} />}</div>;
};

export default Search;
