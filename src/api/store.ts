import axios from 'axios';
import { supabase } from './supabase';
// 타입
import { FetchsStore, Store } from '../types/types';

// store 전체 조회 (글 작성 검색 모달)
export const getStoreData = async (pathname: string) => {
  let data: any[] | null = [];

  if (pathname === '/review') {
    const { data: review } = await supabase.from('store').select('*').order('period_end', { ascending: false });
    data = review;
  }

  if (pathname === '/mate') {
    const { data: mate } = await supabase.from('store').select('*').eq('isclosed', false);

    data = mate;
  }
  return data as Store[];
};

// store 전체 조회 (isclosed, false인 것만)
export const fetchStoreData = async () => {
  const { data } = await supabase.from('store').select('*').eq('isclosed', false);
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
// search page에서 받아온 inputvalue, startDate, endDate로 필터하여
// 무한스크롤
export const getSearchStore = async (
  pageParam: number = 1, // 페이지 번호, 기본값은 1
  inputValue: string, // 검색어
  startDate: string | null, // 시작일
  endDate: string | null // 종료일
): Promise<FetchsStore> => {
  let data: Store[] | null = [];
  let count: number | null = null;

  // supabase 쿼리 객체 생성
  let query = supabase
    .from('store')
    .select()
    .gte('period_end', startDate) // 종료일이 시작일 이후인 경우
    .lte('period_start', endDate) // 시작일이 종료일 이전인 경우
    .range(pageParam * 3 - 3, pageParam * 3 - 1); // 페이지당 3개의 결과를 가져옴

  if (inputValue && inputValue !== '') {
    query = query.or(`title.ilike.%${inputValue}%,location.ilike.%${inputValue}%`);
  }

  // supabase에서 store 데이터를 가져옴
  const { data: stores } = await query;

  data = stores; // 가져온 데이터를 data 변수에 저장

  // 상점 데이터의 총 개수를 가져옴
  const { count: storeCount } = await supabase
    .from('store')
    .select('count', { count: 'exact' })
    .gte('period_end', startDate)
    .lte('period_start', endDate)
    .or(`title.ilike.%${inputValue}%,location.ilike.%${inputValue}%`);

  count = storeCount; // 가져온 데이터를 count 변수에 저장

  const totalPages = count ? Math.floor(count / 3) + (count % 3 === 0 ? 0 : 1) : 1; // 총페이지 수를 계산

  return { stores: data as Store[], page: pageParam, totalPages, count }; // store 데이터와 page 정보를 객체로 반환
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
    // .order('created_at', { ascending: false })
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

  const { count } = await supabase.from('store').select('count', { count: 'exact' });

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return { stores: stores as Store[], page: pageParam, totalPages, count };
};
