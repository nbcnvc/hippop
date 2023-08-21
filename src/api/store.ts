import axios from 'axios';
import { supabase } from './supabase';
import { Store } from '../types/types';

// store 상세 정보 조회
export const fetchDetailData = async (id: string): Promise<Store | null> => {
  const { data } = await supabase.from('store').select('*').eq('id', id).single();
  return data;
};

// hotplace 음식관광 정보 api 호출
export const fetchHotPlaceInfo = async (): Promise<any> => {
  const { data } = await axios.get(
    `  https://seoul.openapi.redtable.global/api/rstr?serviceKey=${process.env.REACT_APP_OPEN_API_SERVICE_KEY}`
  );
  return data.body;
};

// hotplace 음식관광 이미지 api 호출
export const fetchHotPlaceImg = async (): Promise<any> => {
  const { data } = await axios.get(
    `  https://seoul.openapi.redtable.global/api/food/img?serviceKey=${process.env.REACT_APP_OPEN_API_SERVICE_KEY}`
  );
  return data.body;
};
