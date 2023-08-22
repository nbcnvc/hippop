import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CommentProps } from '../../../types/props';
import { createComment, deleteComment, getComments } from '../../../api/comment';
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

  // Commnet 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', id]);
    }
  });
  const deleteButton = (id: number) => {
    // 삭제 확인
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);
    }
    // 삭제 완료
    alert('삭제되었습니다!');
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {/* 댓글 입력창 */}
      <div style={{ width: '90%', border: '1px solid black', padding: '20px', margin: '10px' }}>
        댓글 : <input value={body} onChange={onChangeBody} />
        <button onClick={createButton}>등록</button>
      </div>
      {/* 댓글 목록 */}
      {comments?.map((comment) => {
        return (
          <div key={comment.id} style={{ width: '90%', border: '1px solid black', padding: '20px', margin: '10px' }}>
            <div>작성자</div>
            <div>작성일자: {comment.created_at}</div>
            <div>{comment.body}</div>
            <button onClick={() => deleteButton(comment.id)}>삭제</button>
            <button>수정</button>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
