import { supabase } from './supabase';

import { NewPost, Post } from '../types/types';

// Post 이미지 파일 업로드
export const uploadImages = async (uploadImage: File) => {
  const { data } = await supabase.storage.from('images').upload(`post/${uploadImage.name}`, uploadImage);
  return data;
};

// Post 전체 조회 (추후에 무한스크롤 기능 추가)
export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await supabase.from('post').select('*');
  return data as Post[];
};

// Post 추가
export const createPost = async (newPost: NewPost): Promise<void> => {
  await supabase.from('post').insert(newPost);
};
