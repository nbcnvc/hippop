import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CommentProps } from '../../../types/props';
import { createComment, getComments } from '../../../api/comment';
import { Commnet } from '../../../types/types';

const Comment = ({ post }: CommentProps) => {
  // post_id 가져오기
  const { id } = post;
  const queryClient = useQueryClient();
  const [body, setBody] = useState<string>('');
  const onChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  // Comment 조회
  const { data: comments, isLoading, isError } = useQuery<Commnet[] | null>(['comment', id], () => getComments(id));

  // Comment 추가
  const createMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', id]);
    }
  });
  const createButton = () => {
    // 유효성 검사
    if (!body) {
      return alert('댓글을 입력해주세요.');
    }
    // 새로운 댓글 객체 선언
    const newComment = {
      post_id: id,
      body
    };
    createMutation.mutate(newComment);
    // 입력값 초기화
    setBody('');
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <div style={{ width: '90%', border: '1px solid black', padding: '20px', margin: '10px' }}>
        댓글 : <input value={body} onChange={onChangeBody} />
        <button onClick={createButton}>등록</button>
      </div>
      {/* 작성된 댓글 목록 */}
      {comments?.map((comment) => {
        return (
          <div key={comment.id} style={{ width: '90%', border: '1px solid black', padding: '20px', margin: '10px' }}>
            <div>작성자</div>
            <div>작성일자: {comment.created_at}</div>
            <div>{comment.body}</div>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
