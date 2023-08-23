import axios from 'axios';
import { supabase } from './supabase';
// 타입
import { Store } from '../types/types';

// store 전체 조회
export const fetchStoreData = async () => {
  const { data } = await supabase.from('store').select('*');
  return data as Store[];
};

// store 상세 정보 조회
export const fetchDetailData = async (id: string): Promise<Store | null> => {
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

// export default Kakao;

// hotplace kakao 검색 api 호출
// export const fetchHotPlaceData = async (query: string): Promise<any> => {
//   const { data } = await kakao.get(`v2/search/image?target=title&query=${query}&page=1`);
//   return data.documents;
// };
