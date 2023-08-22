import axios from 'axios';
import { supabase } from './supabase';
import { Store } from '../types/types';

// store 전체 조회
export const fetchStoreData = async (): Promise<Store[] | null> => {
  const { data } = await supabase.from('store').select('*');
  return data;
};

// store 상세 정보 조회
export const fetchDetailData = async (id: string): Promise<Store | null> => {
  const { data } = await supabase.from('store').select('*').eq('id', id).single();
  return data;
};

// kakao 공통 요청 경로 지정
const kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
  }
});

// hotplace kakao 검색 api 호출
// export const fetchHotPlaceData = async (): Promise<any> => {
//   const { data } = await kakao.get(`v2/search/blog?target=title&query=영등포 맛집&page=1`);
//   return data.documents;
// };
