import { supabase } from './supabase';

import { AlarmType } from '../types/types';

// 유저의 알람 목록 조회 (isRead가 false가 것만)
export const getAlarms = async (userId: string): Promise<AlarmType[]> => {
  const { data } = await supabase
    .from('alarm')
    .select('*')
    .eq('targetUserId', userId)
    .eq('isRead', false)
    .order('created_at', { ascending: false }); // 내림차순
  return data as AlarmType[];
};

// 알람 삭제
export const deleteAlarm = async (id: number): Promise<void> => {
  await supabase.from('alarm').delete().eq('id', id);
};
