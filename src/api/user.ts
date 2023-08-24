import { UserInfo } from '../types/types';
import { supabase } from './supabase';

export const getProfileImg = async (userId: string | undefined) => {
  let { data } = await supabase.from('user').select('avatar_url').eq('id', userId).single();
  return data;
};

// User 상세 조회
export const getUser = async (id: string): Promise<UserInfo | null> => {
  const { data } = await supabase.from('user').select('*').eq('id', id).single();
  return data;
};
