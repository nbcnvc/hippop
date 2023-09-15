import { supabase } from './supabase';

import { FetchPost, NewPost, PostType, UpdatePost } from '../types/types';

// Post 이미지 파일 업로드
export const uploadImages = async (uploadImage: File) => {
  const { data } = await supabase.storage.from('images').upload(`post/${uploadImage.name}`, uploadImage);
  return data;
};

// Post 최신순 조회
export const getPosts = async (pageParam: number = 1, param: string): Promise<FetchPost> => {
  let data: PostType[] | null = [];
  let count: number | null = null;

  if (param === '/review') {
    const { data: reviews } = await supabase
      .from('post')
      .select(`*, store(title)`)
      .eq('ctg_index', 1)
      .eq('isdeleted', false)
      .order('created_at', { ascending: false }) // 내림차순
      .range(pageParam * 10 - 10, pageParam * 10 - 1); // 범위 지정

    data = reviews;

    const { count: reviewCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('ctg_index', 1)
      .eq('isdeleted', false);

    count = reviewCount;
  } else if (param === '/mate') {
    const { data: mates } = await supabase
      .from('post')
      .select(`*, user( * ), store( title )`)
      .eq('ctg_index', 2)
      .eq('isdeleted', false)
      .order('created_at', { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = mates;

    const { count: mateCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('ctg_index', 2)
      .eq('isdeleted', false);

    count = mateCount;
  }

  // 총 페이지
  const totalPages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as any, page: pageParam, totalPages, count };
};

// Post 스토어 조회
export const getStorePosts = async (pageParam: number = 1, storeId?: number, param?: string): Promise<FetchPost> => {
  let data: PostType[] | null = [];
  let count: number | null = null;

  if (param === '/review') {
    const { data: reviews } = await supabase
      .from('post')
      .select(`*, store(title)`)
      .eq('ctg_index', 1)
      .eq('isdeleted', false)
      .eq('store_id', storeId)
      .order('created_at', { ascending: false }) // 내림차순
      .range(pageParam * 10 - 10, pageParam * 10 - 1); // 범위 지정

    data = reviews;

    const { count: reviewCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('ctg_index', 1)
      .eq('isdeleted', false)
      .eq('store_id', storeId);

    count = reviewCount;
  } else if (param === '/mate') {
    const { data: mates } = await supabase
      .from('post')
      .select(`*, user!inner(*), store!inner(title)`)
      .eq('ctg_index', 2)
      .eq('isdeleted', false)
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = mates;

    const { count: mateCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('ctg_index', 2)
      .eq('isdeleted', false)
      .eq('store_id', storeId);

    count = mateCount;
  }

  // 총 페이지
  const totalPages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as any, page: pageParam, totalPages, count };
};

// Post 검색 조회
export const getSearchPosts = async (pageParam: number = 1, keyword: string, ctg: string, param?: string) => {
  let data: any[] | null = [];
  let count: number | null = null;

  if (param === '/review') {
    if (ctg === '팝업스토어') {
      const { data: reviews } = await supabase
        .from('post')
        .select(`*, store!inner(title)`)
        .eq('ctg_index', 1)
        .eq('isdeleted', false)
        .ilike('store.title', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = reviews;

      const { count: reviewCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 1)
        .eq('isdeleted', false);

      count = reviewCount;
    } else if (ctg === '제목') {
      const { data: reviews } = await supabase
        .from('post')
        .select(`*, store!inner(title)`)
        .eq('ctg_index', 1)
        .eq('isdeleted', false)
        .ilike('title', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = reviews;

      const { count: reviewCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 1)
        .eq('isdeleted', false);

      count = reviewCount;
    } else if (ctg === '내용') {
      const { data: reviews } = await supabase
        .from('post')
        .select(`*, store!inner(title)`)
        .eq('ctg_index', 1)
        .eq('isdeleted', false)
        .ilike('body', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = reviews;

      const { count: reviewCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 1)
        .eq('isdeleted', false);

      count = reviewCount;
    }
  } else if (param === '/mate') {
    if (ctg === '팝업스토어') {
      const { data: mates } = await supabase
        .from('post')
        .select(`*, user( * ), store!inner(title)`)
        .eq('ctg_index', 2)
        .eq('isdeleted', false)
        .ilike('store.title', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = mates;

      const { count: mateCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 2)
        .eq('isdeleted', false);

      count = mateCount;
    } else if (ctg === '작성자') {
      const { data: mates } = await supabase
        .from('post')
        .select(`*, user!inner( * ), store!inner(title)`)
        .eq('ctg_index', 2)
        .eq('isdeleted', false)
        .ilike('user.name', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = mates;

      const { count: mateCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 2)
        .eq('isdeleted', false);

      count = mateCount;
    } else if (ctg === '제목') {
      const { data: mates } = await supabase
        .from('post')
        .select(`*, user( * ), store!inner(title)`)
        .eq('ctg_index', 2)
        .eq('isdeleted', false)
        .ilike('title', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = mates;

      const { count: mateCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 2)
        .eq('isdeleted', false);

      count = mateCount;
    } else if (ctg === '내용') {
      const { data: mates } = await supabase
        .from('post')
        .select(`*, user( * ), store!inner(title)`)
        .eq('ctg_index', 2)
        .eq('isdeleted', false)
        .ilike('body', `%${keyword}%`)
        .order('created_at', { ascending: false })
        .range(pageParam * 10 - 10, pageParam * 10 - 1);

      data = mates;

      const { count: mateCount } = await supabase
        .from('post')
        .select('count', { count: 'exact' })
        .eq('ctg_index', 2)
        .eq('isdeleted', false);

      count = mateCount;
    }
  }
  // 총 페이지
  const totalPages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as any, page: pageParam, totalPages, count };
};

// Review Post 인기순 조회
export const getPopularPosts = async (pageParam: number = 1, param?: string): Promise<FetchPost> => {
  let data: PostType[] | null = [];
  let count: number | null = null;

  if (param === '/review') {
    const { data: reviews } = await supabase.from('popular_posts').select('*');

    data = reviews;

    const { count: reviewCount } = await supabase.from('popular_posts').select('*');

    count = reviewCount;
  }

  // 총 페이지
  const totalPages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as any, page: pageParam, totalPages, count };
};

// myPage 내가 쓴 글 Post 전체 조회
export const getMyItems = async (userId: string, itemType: 'posts' | 'stores', pageParam: number = 1): Promise<any> => {
  const PAGE_SIZE = 3; // 페이지당 아이템 개수
  const resource = itemType === 'posts' ? 'post' : 'store';
  const { data: items } = await supabase
    .from(resource)
    .select()
    .eq('isdeleted', false)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);
  const { count } = await supabase.from(resource).select('count', { count: 'exact' }).eq('isdeleted', false);

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return { items, page: pageParam, totalPages, count };
};

// yourPage 내가 쓴 글 Review Post 조회
export const getYourItems = async (
  userId: string,
  itemType: 'posts' | 'stores',
  pageParam: number = 1
): Promise<any> => {
  const PAGE_SIZE = 4; // 페이지당 아이템 개수
  const resource = itemType === 'posts' ? 'post' : 'store';
  const { data: items } = await supabase
    .from(resource)
    .select(`*, store( title )`)
    .eq('ctg_index', 1)
    .eq('isdeleted', false)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);
  const { count } = await supabase
    .from(resource)
    .select('count', { count: 'exact' })
    .eq('ctg_index', 1)
    .eq('isdeleted', false)
    .eq('user_id', userId);

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

// Post 삭제 (isdeleted true로 수정)
export const deletePost = async (id: number): Promise<void> => {
  await supabase.from('post').update({ isdeleted: true }).eq('id', id).select();
};

// Post 수정
export const updatePost = async (updatePost: UpdatePost): Promise<void> => {
  await supabase.from('post').update(updatePost).eq('id', updatePost.id).select();
};
