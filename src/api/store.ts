import { Store } from '../types/types';
import { supabase } from './supabase';

// store 상제 정보 조회
export const fetchDetailData = async (id: string): Promise<Store[] | null> => {
  const response = await supabase.from('store').select('*').eq('id', id);
  return response.data;
};
