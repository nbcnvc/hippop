import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../api/supabase';
import { getSubList } from '../../api/subscribe';
import { useCurrentUser } from '../../store/userStore';
import { useEffect, useState } from 'react';

const Alarm = () => {
  const currentUser = useCurrentUser();
  const userId = currentUser?.id;
  // 현재 유저가 구독한 사람 목록 가져오기
  const { data } = useQuery(['sublist'], () => getSubList(userId ?? ''));

  // 배열로 만들기
  let subList: any[] = [];
  if (data) {
    subList = data.map((item) => item.subscribe_to);
  }

  // payload 담아주기
  const [payloadData, setPayloadData] = useState<any[]>([]);
  useEffect(() => {
    const channel = supabase
      .channel('table-filter-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'post',
          filter: `user_id=in.(${subList})`
        },
        (payload) => {
          setPayloadData((prevData) => [...prevData, payload]); // 새로운 payload를 상태에 추가
        }
      )
      .subscribe();

    return () => {
      // 구독 해제
      channel.unsubscribe();
    };
  }, [subList]);

  // alarm 테이블에 메시지 넣어주기

  // alarm 테이블에서 현재 유저에게 온 알람 가져와서 띄워주기

  return <></>;
};

export default Alarm;
