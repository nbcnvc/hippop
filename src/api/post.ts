import { supabase } from './supabase';

import { FetchPost, NewPost, PostType, UpdatePost } from '../types/types';

// Post 이미지 파일 업로드
export const uploadImages = async (uploadImage: File) => {
  const { data } = await supabase.storage.from('images').upload(`post/${uploadImage.name}`, uploadImage);
  return data;
};

// Post 전체 조회 (isDeleted가 false인 것만)
export const getPosts = async (pageParam: number = 1, param?: string): Promise<FetchPost> => {
  let data: PostType[] | null = [];
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

  return { posts: data as PostType[], page: pageParam, totalPages, count };
};

//myPage - pageParam
// 내가 쓴 글 Post 전체 조회 (isDeleted가 false인 것만)
export const getMyItems = async (userId: string, itemType: 'posts' | 'stores', pageParam: number = 1): Promise<any> => {
  const PAGE_SIZE = 3; // 페이지당 아이템 개수
  const resource = itemType === 'posts' ? 'post' : 'store';
  const { data: items } = await supabase
    .from(resource)
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);
  const { count } = await supabase.from(resource).select('count', { count: 'exact' });

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return { items, page: pageParam, totalPages, count };
};

// Post 상세 조회
export const getPost = async (id: number): Promise<any> => {
  const { data } = await supabase.from('post').select(`*, user( * ), store( title )`).eq('id', id).single();
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
export const updatePost = async (updatePost: UpdatePost): Promise<void> => {
  await supabase.from('post').update(updatePost).eq('id', updatePost.id).select();
};
