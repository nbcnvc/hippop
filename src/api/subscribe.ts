import { supabase } from './supabase';

import { SubscribeType } from '../types/types';

// 구독 및 구독취소
export const toggleSubscribe = async (subscribe: SubscribeType): Promise<void> => {
  const { data: isSubscribe }: any = await supabase
    .from('subscribe')
    .select('*')
    .eq('subscribe_from', subscribe.subscribe_from)
    .eq('subscribe_to', subscribe.subscribe_to);

  if (isSubscribe.length > 0) {
    await supabase
      .from('subscribe')
      .delete()
      .eq('subscribe_from', subscribe.subscribe_from)
      .eq('subscribe_to', subscribe.subscribe_to);
  } else {
    await supabase.from('subscribe').insert(subscribe);
  }
};

// 구독 확인
export const isSubscribe = async (subscribe: SubscribeType) => {
  const { data } = await supabase
    .from('subscribe')
    .select('')
    .eq('subscribe_from', subscribe.subscribe_from)
    .eq('subscribe_to', subscribe.subscribe_to);

  return data;
};
