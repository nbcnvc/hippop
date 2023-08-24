import { supabase } from './supabase';

import { UserInfo } from '../types/types';

// User 상세 조회
export const getUser = async (id: string): Promise<UserInfo | null> => {
  const { data } = await supabase.from('user').select('*').eq('id', id).single();
  return data;
};
