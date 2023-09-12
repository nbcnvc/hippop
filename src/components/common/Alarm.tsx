import { useEffect, useState } from 'react';
// 라이브러리
import { useQuery } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// api
import { supabase } from '../../api/supabase';
import { getSubList } from '../../api/subscribe';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 스타일
import { styled } from 'styled-components';
// mui
import TextsmsIcon from '@mui/icons-material/Textsms';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Alarm = () => {
  // realtime으로 받아온 정보 세팅
  const [postData, setPostData] = useState<any>();
  const [subData, setSubData] = useState<any>();
  const [msgData, setMsgData] = useState<any>();

  // 현재 유저 정보 가져오기
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;

  // 유저의 구독자 리스트 가져오기!
  const { data } = useQuery(['sublist'], () => getSubList(currentUserId ?? ''));
  let subList: any[] = [];
  if (data) {
    subList = data.map((item) => item.subscribe_to);
  }

  supabase
    .channel('db-changes')
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
          setPostData(payload);
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
      (payload) => {
        setSubData(payload);
      }
    )
    // 누군가가 유저에게 쪽지를 보냈을 때 알림
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'message',
        filter: `receiver=eq.${currentUserId}`
      },
      (payload) => {
        setMsgData(payload);
      }
    )
    .subscribe();

  // 내가 구독한 작성자의 새 게시글 알림 메세지
  useEffect(() => {
    if (postData) {
      // 작성자 아이디 가져오기
      const writerId = postData.new.user_id;

      const postAlarm = async () => {
        // 작성자 정보 가져오기
        const { data: user } = await supabase.from('user').select('*').eq('id', writerId).single();

        if (user) {
          // 메세지에 들어갈 내용 세팅
          const writerName = user.name;
          const newAlarm = {
            ctg_index: 1,
            created_at: postData.commit_timestamp,
            targetUserId: currentUserId,
            content: `${writerName}님의 새 게시글: ${postData.new.title}`,
            post_id: postData.new.id
          };

          // 메세지 테이블에 DB 추가
          await supabase.from('alarm').insert(newAlarm);

          // 메세지 테이블에서 알람 데이터 가져오기
          const { data: alarm } = await supabase
            .from('alarm')
            .select('*')
            .eq('targetUserId', currentUserId)
            .order('created_at', { ascending: true });

          if (alarm) {
            toast.info(alarm[alarm.length - 1]?.content, {
              theme: 'light',
              icon: <BorderColorIcon />
            });
          }
        }
      };
      postAlarm();
    }
  }, [postData, currentUserId]);

  // 누군가가 유저를 구독했을 때 알림 메시지
  useEffect(() => {
    if (subData) {
      // 나를 구독한 사람 아이디 가져오기
      const subFromId = subData.new.subscribe_from;

      const subAlarm = async () => {
        // 나를 구독한 사람 정보 가져오기
        const { data: user } = await supabase.from('user').select('*').eq('id', subFromId).single();

        if (user) {
          // 메세지에 들어갈 내용 세팅
          const subFromName = user.name;
          const newAlarm = {
            ctg_index: 2,
            created_at: subData.commit_timestamp,
            targetUserId: currentUserId,
            content: `${subFromName}님이 나를 구독하였습니다.`,
            sub_from: subData.new.subscribe_from
          };

          // 메세지 테이블에 DB 추가
          await supabase.from('alarm').insert(newAlarm);

          // 메세지 테이블에서 알람 데이터 가져오기
          const { data: alarm } = await supabase
            .from('alarm')
            .select('*')
            .eq('targetUserId', currentUserId)
            .order('created_at', { ascending: true });

          if (alarm) {
            toast.info(alarm[alarm.length - 1]?.content, {
              theme: 'colored',
              icon: <PeopleAltIcon />
            });
          }
        }
      };
      subAlarm();
    }
  }, [subData, currentUserId]);

  // 누군가가 유저에게 쪽지를 보냈을 때 알림 메시지
  useEffect(() => {
    if (msgData) {
      // 나에게 쪽지를 보낸 사람 아이디 가져오기
      const senderId = msgData.new.sender;

      const msgAlarm = async () => {
        // 나에게 쪽지를 보낸 사람 가져오기
        const { data: user } = await supabase.from('user').select('*').eq('id', senderId).single();

        if (user) {
          // 메세지에 들어갈 내용 세팅
          const senderName = user.name;
          const newAlarm = {
            ctg_index: 3,
            created_at: msgData.commit_timestamp,
            targetUserId: currentUserId,
            content: `${senderName}님이 나에게 쪽지를 보냈습니다.`
          };

          // 메세지 테이블에 DB 추가
          await supabase.from('alarm').insert(newAlarm);

          // 메세지 테이블에서 알람 데이터 가져오기
          const { data: alarm } = await supabase
            .from('alarm')
            .select('*')
            .eq('targetUserId', currentUserId)
            .order('created_at', { ascending: true });

          if (alarm) {
            toast.info(alarm[alarm.length - 1]?.content, {
              theme: 'colored',
              icon: <TextsmsIcon />
            });
          }
        }
      };

      msgAlarm();
    }
  }, [msgData, currentUserId]);

  return <div></div>;
};

export default Alarm;
