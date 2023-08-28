import { MessageType } from '../types/types';
import { supabase } from './supabase';

// 메세지 보내기 => receive_Message table
export const receiveMessage = async (message: MessageType) => {
  const { error } = await supabase.from('receive_message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};

// 메세지 보내기 => send_Message table
export const sendMessage = async (message: MessageType) => {
  const { error } = await supabase.from('send_message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};

// 수신메세지 받기
export let recieveMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('receive_message').select(`*, user(*)`).eq('receiver', userId);

  console.log('data', data);
  if (error) {
    console.log('error');
  }
  return data;
};

// 내가 보낸 메세지 데이터 받기
export const mySendMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('send_message').select(`*, user(*)`).eq('sender', userId);

  console.log('data', data);
  if (error) {
    console.log('error');
  }
  return data;
};

// 메세지 확인
export const readSendMessage = async (id: number): Promise<void> => {
  await supabase.from('send_message').update({ isRead: true }).eq('id', id);
  console.log('readSendMessage', readSendMessage);
};

// 메세지 확인
export const readReceiveMessage = async (id: number): Promise<void> => {
  await supabase.from('receive_message').update({ isRead: true }).eq('id', id);
  console.log('readReceiveMessage', readReceiveMessage);
};
