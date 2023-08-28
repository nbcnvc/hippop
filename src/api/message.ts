import { MessageType } from '../types/types';
import { supabase } from './supabase';

// 메세지 보내기 => send_Message table
export const sendMessage = async (message: MessageType) => {
  const { error } = await supabase.from('message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};

// 수신메세지 받기
export let receiveMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase
    .from('message')
    .select(
      `
    *,
    from:sender(*),
    to:receiver(*)
  `
    )
    .eq('receiver', userId);
  console.log('data', data);
  if (error) {
    console.log('error');
  }
  return data;
};

// 수신메세지 중 읽지 않은 것만 받기
export let receiveAlarmMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*`).eq('receiver', userId).eq('isRead', false);

  console.log('data', data);
  if (error) {
    console.log('error');
  }
  return data;
};

// 내가 보낸 메세지 데이터 받기
export const mySendMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*`).eq('sender', userId);

  console.log('data', data);
  if (error) {
    console.log('error');
  }
  return data;
};

// 메세지 확인
export const readMessage = async (id: number): Promise<void> => {
  await supabase.from('message').update({ isRead: true }).eq('id', id);
};
