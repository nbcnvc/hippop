import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../api/supabase';
import { getSubList } from '../../api/subscribe';
import { useCurrentUser } from '../../store/userStore';
import { useState, useEffect } from 'react';
import AlarmSub from './AlarmSub';

const Alarm = () => {
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const { data } = useQuery(['sublist'], () => getSubList(currentUserId ?? ''));

  let subList: any[] = [];
  if (data) {
    subList = data.map((item) => item.subscribe_to);
  }

  const [payloadData, setPayloadData] = useState<any>();
  const [alarm, setAlarm] = useState<any[]>([]);

  const setIsAlarm = () => {
    supabase.channel('db-changes').on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'post',
        filter: `user_id=in.(${subList})`
      },
      (payload) => setPayloadData(payload)
    );
  };

  setIsAlarm();

  useEffect(() => {
    if (payloadData) {
      const writerId = payloadData.new.user_id;

      // async 함수 내에서 await를 사용하려면 async 키워드를 추가합니다.
      const fetchAlarm = async () => {
        const { data: user } = await supabase.from('user').select('*').eq('id', writerId).single();

        if (user) {
          // 유저 데이터가 있는 경우에만 처리합니다.
          const writerName = user.name;

          const newAlarm = {
            created_at: payloadData.commit_timestamp,
            targetUserId: currentUserId,
            content: `${writerName}님의 새 게시글: ${payloadData.new.title}`
          };

          // 쿼리로 바꿔주기
          await supabase.from('alarm').insert(newAlarm);

          const { data: alarms } = await supabase.from('alarm').select('*').eq('targetUserId', currentUserId);
          if (alarms) {
            setAlarm(alarms);
          }
          setTimeout(() => {
            setAlarm([]);
          }, 5000);
        }
      };

      fetchAlarm();
    }
  }, [payloadData, currentUserId]);

  return (
    <div>
      <div style={{ backgroundColor: 'yellow', color: 'black' }}>{alarm[alarm.length - 1]?.content}</div>
    </div>
  );
};

export default Alarm;
