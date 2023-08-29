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
// export const mySendMessage = async (userId: string): Promise<MessageType[] | null> => {
//   const { data, error } = await supabase.from('message').select(`*`).eq('sender', userId);

//   if (error) {
//     console.log('Error receiving message:', error.message);
//   }
//   return data;
// };

export const mySendMessage = async (userId: string): Promise<MessageType[] | null> => {
  const { data, error } = await supabase.from('message').select(`*, user(name, avatar_url)`);

  if (error) {
    console.log('Error receiving message:', error.message);
  }
  return data;
};

// 발신메세지 받기
// export const mySendMessage = async (userId: string): Promise<any> => {
//   // 내가 보낸 메시지 리스트
//   const { data: sendingMessages, error: sendMessageError } = await supabase
//     .from('message')
//     .select(`*`)
//     .eq('sender', userId);

//   // 받는 사람의 user 정보
//   const { data: receivers, error: receriversError } = await supabase
//     .from('user')
//     .select('*')
//     .in(
//       'id',
//       (sendingMessages ?? []).map((m) => m.receiver)
//     );

//   // 조합 결과
//   const aa = sendingMessages?.map((message) => {
//     const selectedReceiver = receivers?.find((r) => r.id === message.receiver);
//     return { ...message, ...selectedReceiver };
//   });

//   console.log('결과물 ==> ', aa);

//   console.log('받는 사람의 user 정보 ==> ', receivers);

//   // 내가 받은 메시지 리스트
//   const { data: receivingMessages, error: receiveMessageError } = await supabase
//     .from('message')
//     .select(`*`)
//     .eq('receiver', userId);

//   if (sendingMessages) {
//     console.log('내가 보낸 메시지 리스트 => ', sendingMessages);
//   }

//   if (receivingMessages) {
//     console.log('내가 받은 메시지 리스트 => ', receivingMessages);
//   }

//   if (sendMessageError) {
//     console.log('Error sendMessageError:', sendMessageError.message);
//   }

//   if (receiveMessageError) {
//     console.log('Error receiveMessageError:', receiveMessageError.message);
//   }
// };

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
