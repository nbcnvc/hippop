import { supabase } from './supabase';

export interface MessageType {
  sender: string;
  reciever: string;
  body: string;
  isRead: boolean;
}

// 메세지 보내기
export const sendMessage = async (message: MessageType) => {
  const { error } = await supabase.from('message').insert(message);

  if (error) {
    console.log('Error sending message:', error.message);
  }
};
