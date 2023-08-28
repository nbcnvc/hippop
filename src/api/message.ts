import { supabase } from './supabase';
import { MessageType } from '../types/types';

// 메세지 보내기, 메세지 답장 보내기  => message table
export const sendMessage = async (message: MessageType) => {
  const { error } = await supabase.from('message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};

// 수신메세지 받기
export const receiveMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*`).eq('receiver', userId);

  if (error) {
    console.log('Error receiving message:', error.message);
  }
  return data;
};

// 발신메세지 받기
export const mySendMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*`).eq('sender', userId);

  if (error) {
    console.log('Error receiving message:', error.message);
  }
  return data;
};

// 메세지 확인
export const readMessage = async (id: number): Promise<void> => {
  const { error } = await supabase.from('message').update({ isRead: true }).eq('id', id);

  if (error) {
    console.log('Error reading message:', error.message);
  }
};

// 메세지 삭제
export const deleteMessage = async (id: number): Promise<void> => {
  const { error } = await supabase.from('message').delete().eq('id', id);

  if (error) {
    console.log('Error deleting message:', error.message);
  }
};
