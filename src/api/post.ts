import { supabase } from './supabase';

import { NewPost } from '../types/types';

// Post 이미지 파일 업로드
const uploadImages = async (uploadImage: File) => {
  const { data } = await supabase.storage.from('images').upload(`post/${uploadImage.name}`, uploadImage);
  return data;
};

// Post 추가
const createPost = async (newPost: NewPost): Promise<void> => {
  await supabase.from('post').insert(newPost);
};

export { uploadImages, createPost };
