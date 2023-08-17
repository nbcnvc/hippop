import { Store } from '../types/types';
import { supabase } from './supabase';

// store 상세 정보 조회
export const fetchDetailData = async (id: string): Promise<Store | null> => {
  const { data } = await supabase.from('store').select('*').eq('id', id).single();
  return data;
};
