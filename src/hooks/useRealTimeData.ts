import { useEffect, useState } from 'react';

import { supabase } from '../api/supabase';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

export const useRealTimeData = (subList: any[], currentUserId: any) => {
  const [realtimeData, setRealtimeData] = useState<
    RealtimePostgresInsertPayload<{
      [key: string]: any;
    }>
  >();

  supabase
    .channel('table-filter-changes')
    // 내가 구독한 작성자의 새 게시글 알림
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'post',
        filter: `user_id=in.(${subList})`
      },
      (payload) => {
        if (payload.new.ctg_index === 1) {
          console.log(payload);
          setRealtimeData(payload);
        }
      }
    )
    // 누군가가 유저를 구독 했을 때 알림
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'subscribe',
        filter: `subscribe_to=eq.${currentUserId}`
      },
      (payload) => setRealtimeData(payload)
    )
    // 누군가가 유저에게 쪽지를 보냈을 때 알림
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'meaasge',
        filter: `receiver=eq.${currentUserId}`
      },
      (payload) => setRealtimeData(payload)
    )
    .subscribe();
};
