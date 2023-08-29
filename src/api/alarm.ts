import { supabase } from './supabase';

import { AlarmType } from '../types/types';

// export const getRealTimeData = (subList: any[], currentUserId: any) => {
//   let payload: any = null;

//   const realtime = supabase
//     .channel('table-filter-changes')
//     // 내가 구독한 작성자의 새 게시글 알림
//     .on(
//       'postgres_changes',
//       {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'post',
//         filter: `user_id=in.(${subList})`
//       },
//       (payload) => {
//         if (payload.new.ctg_index === 1) {
//           payload = payload;
//         }
//       }
//     )
//     // 누군가가 유저를 구독 했을 때 알림
//     .on(
//       'postgres_changes',
//       {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'subscribe',
//         filter: `subscribe_to=eq.${currentUserId}`
//       },
//       (payload) => (payload = payload)
//     )
//     // 누군가가 유저에게 쪽지를 보냈을 때 알림
//     .on(
//       'postgres_changes',
//       {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'meaasge',
//         filter: `receiver=eq.${currentUserId}`
//       },
//       (payload) => (payload = payload)
//     )
//     .subscribe();

//   return { realtime: payload as any };
// };

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
