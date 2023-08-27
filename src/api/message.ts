import { MessageType } from '../types/types';
import { supabase } from './supabase';

// 메세지 보내기
export const receiveMessage = async (message: MessageType) => {
  const { error } = await supabase.from('message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};

// 메세지 보내기
export const sendMessage = async (message: MessageType) => {
  const { error } = await supabase.from('send_message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};

// // 수신메세지 받기
// export const recieveMessage = async (id: string): Promise<MessageType[] | null> => {
//   const { data, error } = await supabase.from('user').select(`*, message(*)`).eq('id', id);

//   console.log('data', data);
//   if (error) {
//     console.log('error');
//   }
//   return data;
// };

// // 내가 보낸 메세지 데이터 받기
// export const mySendMessage = async (id: string): Promise<MessageType[] | null> => {
//   const { data, error } = await supabase.from('user').select(`*, message(*)`).eq('id', id);

//   console.log('data', data);
//   if (error) {
//     console.log('error');
//   }
//   return data;
// };

// 수신메세지 받기
export const recieveMessages = async (): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*`);

  console.log('data', data);
  if (error) {
    console.log('error');
  }
  return data;
};

// 내가 보낸 메세지 데이터 받기
export const mySendMessage = async (sender: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*, user(name, avatar_url)`).eq('sender', sender);

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
