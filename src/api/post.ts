import { supabase } from './supabase';

import { FetchPost, NewPost, Post } from '../types/types';

// Post 이미지 파일 업로드
export const uploadImages = async (uploadImage: File) => {
  const { data } = await supabase.storage.from('images').upload(`post/${uploadImage.name}`, uploadImage);
  return data;
};

// Post 전체 조회 (isDeleted가 false인 것만)
export const getPosts = async (pageParam: number = 1, param?: string): Promise<FetchPost> => {
  let data: Post[] | null = [];
  let count: number | null = null;

  if (param === '/review') {
    const { data: reviews } = await supabase
      .from('post')
      .select()
      .eq('ctg_index', 1)
      .eq('isDeleted', false)
      .order('created_at', { ascending: false }) // 내림차순
      .range(pageParam * 10 - 10, pageParam * 10 - 1); // 범위 지정

    data = reviews;

    const { count: reviewCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('ctg_index', 1)
      .eq('isDeleted', false);

    count = reviewCount;
  } else if (param === '/mate') {
    const { data: mates } = await supabase
      .from('post')
      .select()
      .eq('ctg_index', 2)
      .eq('isDeleted', false)
      .order('created_at', { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = mates;

    const { count: mateCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('ctg_index', 2)
      .eq('isDeleted', false);

    count = mateCount;
  }

  // 총 페이지
  const totalPages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as Post[], page: pageParam, totalPages, count };
};

// Post 상세 조회
export const getPost = async (id: number): Promise<Post | null> => {
  const { data } = await supabase.from('post').select('*').eq('id', id).single();
  return data;
};

// Post 추가
export const createPost = async (newPost: NewPost): Promise<void> => {
  await supabase.from('post').insert(newPost);
};

// Post 삭제 (isDeleted true로 수정)
export const deletePost = async (id: number): Promise<void> => {
  await supabase.from('post').update({ isDeleted: true }).eq('id', id).select();
};

// Post 수정
export const updatePost = async (editPost: Post): Promise<void> => {
  await supabase.from('post').update(editPost).eq('id', editPost.id).select();
};
