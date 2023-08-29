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

  const totalPages = count ? Math.floor(count / 3) + (count % 3 === 0 ? 0 : 1) : 1;

  return { stores: data as Store[], page: pageParam, totalPages, count };
};

// myPage - pageParam
export const getMyStores = async (userId: string, pageParam: number = 1): Promise<FetchsStore> => {
  const PAGE_SIZE = 3; // 페이지당 아이템 개수

  const { data: trigger } = await supabase.from('bookmark').select('store_id').eq('user_id', userId);

  const storeIds = (trigger || []).map((item) => item.store_id);
  // store_id만 추출한 배열 생성

  const { data: stores } = await supabase
    .from('store')
    .select()
    .in('id', storeIds) // storeIds 배열에 포함된 id들을 가진 store 조회
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

  const { count } = await supabase.from('store').select('count', { count: 'exact' });

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return { stores: stores as Store[], page: pageParam, totalPages, count };
};
