import React from 'react';
// 라이브러리
import { useQuery } from '@tanstack/react-query';
// 타입
import { CommentCountProps } from '../../../types/props';
// api
import { getCommentCount } from '../../../api/comment';

const CommentCount = ({ postId }: CommentCountProps) => {
  const { data } = useQuery(['commentcount', postId], () => getCommentCount(postId));
  return <div>{data}</div>;
};

export default CommentCount;
