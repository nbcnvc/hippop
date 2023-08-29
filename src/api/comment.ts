import { supabase } from './supabase';

import { Comment, FetchComment, NewComment } from '../types/types';

// Comment 상세 조회 (isDeleted가 false 것만, 추후에 더보기 기능 추가)
export const getComments = async (pageParam: number = 1, postId: number): Promise<any> => {
  let data: Comment[] | null = [];
  let count: number | null = null;

  const { data: comments } = await supabase
    .from('comment')
    .select(`*, user( * )`)
    .eq('post_id', postId)
    .eq('isDeleted', false)
    .order('created_at', { ascending: false }) // 내림차순
    .range(pageParam * 5 - 5, pageParam * 5 - 1); // 범위 지정

  data = comments;

  const { count: commentCount } = await supabase
    .from('comment')
    .select('count', { count: 'exact' })
    .eq('post_id', postId)
    .eq('isDeleted', false);

  count = commentCount;

  // 총 페이지
  const totalPages = count ? Math.floor(count / 5) + (count % 5 === 0 ? 0 : 1) : 1;

  return { comments: data as Comment[], page: pageParam, totalPages, count };
};

// Comment 추가
export const createComment = async (newComment: NewComment): Promise<void> => {
  await supabase.from('comment').insert(newComment);
};

// Commnet 삭제 (isDeleted true로 수정)
export const deleteComment = async (id: number): Promise<void> => {
  await supabase.from('comment').update({ isDeleted: true }).eq('id', id).select();
};

// Commnet 수정
export const updateComment = async (editComment: Comment): Promise<void> => {
  await supabase.from('comment').update({ body: editComment.body }).eq('id', editComment.id).select();
};
