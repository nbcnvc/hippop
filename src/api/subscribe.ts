import { supabase } from './supabase';

import { SubscribeType } from '../types/types';

// 구독 확인
export const isSubscribe = async (subscribe: SubscribeType) => {
  const { data } = await supabase
    .from('subscribe')
    .select('')
    .eq('subscribe_from', subscribe.subscribe_from)
    .eq('subscribe_to', subscribe.subscribe_to);
  return data;
};

// 구독 하기
export const createSubscribe = async (subscribe: SubscribeType): Promise<void> => {
  await supabase.from('subscribe').insert(subscribe);
};

// 구독 취소
export const deleteSubscribe = async (subscribe: SubscribeType): Promise<void> => {
  await supabase
    .from('subscribe')
    .delete()
    .eq('subscribe_from', subscribe.subscribe_from)
    .eq('subscribe_to', subscribe.subscribe_to);
};

// 구독자 목록 가져오기
export const getSubList = async (userId: string) => {
  const { data } = await supabase.from('subscribe').select('subscribe_to').eq('subscribe_from', userId);
  return data;
};
