import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CommentProps } from '../../../types/props';
import { createComment } from '../../../api/comment';

const Comment = ({ post }: CommentProps) => {
  // post_id 가져오기
  const { id } = post;
  const [body, setBody] = useState<string>('');
  const onChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  // Comment 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
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

  return (
    <>
      <div style={{ width: '90%', border: '1px solid black', padding: '20px', margin: '10px' }}>
        댓글 : <input value={body} onChange={onChangeBody} />
        <button onClick={createButton}>등록</button>
      </div>
      {/* 작성된 댓글 목록 */}
    </>
  );
};

export default Comment;
