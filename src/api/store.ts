import axios from 'axios';
import { supabase } from './supabase';
// 타입
import { FetchsStore, Store } from '../types/types';

// store 전체 조회
export const fetchStoreData = async () => {
  const { data } = await supabase.from('store').select('*');
  return data as Store[];
};

// store 상세 정보 조회
export const fetchDetailData = async (id: number): Promise<Store | null> => {
  const { data } = await supabase.from('store').select('*').eq('id', id).single();
  return data;
};

// kakao 공통 요청 경로 지정
export const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
  }
});

// 검색페이지 인피니티 스크롤(3개씩) store 조회
export const getInfinityStore = async (pageParam: number = 1): Promise<FetchsStore> => {
  let data: Store[] | null = [];
  let count: number | null = null;

  const { data: stores } = await supabase
    .from('store')
    .select()
    .order('created_at', { ascending: false })
    .range(pageParam * 3 - 3, pageParam * 3 - 1);
  data = stores;

  const { count: storeCount } = await supabase.from('store').select('count', { count: 'exact' });

  count = storeCount;

  // 총 페이지
  const totalPages = count ? Math.floor(count / 3) + (count % 3 === 0 ? 0 : 1) : 1;

  return { stores: data as Store[], page: pageParam, totalPages, count };
};

// 검색페이지 인피니티 스크롤(3개씩) store 조회
// API function with added filters
export const getInfinityStore1 = async (
  pageParam: number = 1,
  inputValue: string,
  startDate: string | null,
  endDate: string | null
): Promise<FetchsStore> => {
  let data: Store[] | null = [];
  let count: number | null = null;

  let query = supabase
    .from('store')
    .select()
    .gte('period_end', startDate)
    .lte('period_start', endDate)
    .order('created_at', { ascending: false })
    .range(pageParam * 3 - 3, pageParam * 3 - 1);

  if (inputValue) {
    query = query.or(`title.ilike.%${inputValue}%,body.ilike.%${inputValue}%,location.ilike.%${inputValue}%`);
  }

  console.log('startDate ====>', startDate);
  console.log('endDate ====>', endDate);

  const { data: stores } = await query;

  data = stores;

  console.log('stores ===> ', stores);

  const { count: storeCount } = await supabase.from('store').select('count', { count: 'exact' });
  count = storeCount;
  console.log('storeCount ===> ', storeCount);
  // Calculate total pages
  const totalPages = count ? Math.floor(count / 3) + (count % 3 === 0 ? 0 : 1) : 1;

  return { stores: data as Store[], page: pageParam, totalPages, count };
};
