import { supabase } from './supabase';

import { Comment, NewCommnet } from '../types/types';

// Comment 상세 조회 (isDeleted가 false 것만, 추후에 더보기 기능 추가)
export const getComments = async (postId: number) => {
  const { data } = await supabase
    .from('comment')
    .select()
    .eq('post_id', postId)
    .eq('isDeleted', false)
    .order('created_at', { ascending: false });
  return data;
};

// Comment 추가
export const createComment = async (newComment: NewCommnet): Promise<void> => {
  await supabase.from('comment').insert(newComment);
};

// Commnet 삭제 (isDeleted true로 수정)
export const deleteComment = async (id: number): Promise<void> => {
  await supabase.from('comment').update({ isDeleted: true }).eq('id', id).select();
};

// Commnet 수정
export const updateComment = async (editComment: Comment): Promise<void> => {
  await supabase.from('comment').update(editComment).eq('id', editComment.id).select();
};
