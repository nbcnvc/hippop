import React, { useMemo, useState } from 'react';

import moment from 'moment';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { CommentProps } from '../../../types/props';
import { createComment, deleteComment, getComments, updateComment } from '../../../api/comment';
import { Comment } from '../../../types/types';
import { useCurrentUser } from '../../../store/userStore';
import { styled } from 'styled-components';

const Comments = ({ postId }: CommentProps) => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const [body, setBody] = useState<string>('');
  const [edit, setEdit] = useState<string>('');
  const [isEditId, setIsEditId] = useState<number | null>(null);
  const [showButton, setShowButton] = useState<boolean>(true);
  const onChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };
  const onChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
  };

  // Comment 조회
  const {
    data: comments,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['comment', postId],
    queryFn: ({ pageParam }) => getComments(pageParam, postId),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
    }
  });

  const selectComments = useMemo(() => {
    return comments?.pages
      .map((data) => {
        return data.comments;
      })
      .flat();
  }, [comments]);

  // 더보기 버튼
  const fetchMore = () => {
    if (!hasNextPage) {
      setShowButton(false);
      return;
    }
    fetchNextPage();
  };

  // Comment 추가
  const createMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', postId]);
    }
  });
  const createButton = () => {
    // 유효성 검사
    if (!currentUser) {
      alert('로그인을 해주세요.');
      setBody('');
      return;
    }
    if (!body) {
      return alert('댓글을 입력해주세요.');
    }
    if (body.length > 50) {
      return alert('댓글은 50글자 미만으로 입력해주세요.');
    }
    // 새로운 댓글 객체 선언
    const newComment = {
      user_id: currentUser?.id,
      post_id: postId,
      body
    };
    createMutation.mutate(newComment);
    // 입력값 초기화
    setBody('');
  };

  // Commnet 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', postId]);
    }
  });
  const deleteButton = (id: number) => {
    // 삭제 확인
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);

      // 삭제 완료
      alert('삭제되었습니다!');
    }
  };

  // Commnet 수정
  const updateMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', postId]);
    }
  });
  const editButton = (comment: Comment) => {
    // 선택한 댓글 찾기
    if (isEditId === comment.id) {
      // 수정 댓글 선언
      const editComment = {
        ...comment,
        body: edit
      };
      // DB 수정
      updateMutation.mutate(editComment);
      setIsEditId(null);
    } else {
      // 수정 모드로 변경
      setIsEditId(comment.id);
      setEdit(comment.body);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <Layout>
      {/* 댓글 입력창 */}
      <CommentWrite>
        <Title>댓글</Title>
        <Input
          value={body}
          onChange={onChangeBody}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              createButton();
            }
          }}
          placeholder="댓글을 입력해주세요."
        />
        <button className="custom-btn" onClick={createButton}>
          등록
        </button>
      </CommentWrite>
      {/* 댓글 목록 */}
      {selectComments?.map((comment) => {
        return (
          <>
            {currentUser?.id === comment.user_id && (
              <ButtonBox>
                <Button onClick={() => deleteButton(comment.id)}>삭제</Button>
                <Button onClick={() => editButton(comment)}>{isEditId ? '저장' : '수정'}</Button>
              </ButtonBox>
            )}
            <CommentBox>
              <DateBox>
                <Date>{moment(comment.created_at).format('YYYY.MM.DD HH:mm')}</Date>
              </DateBox>
              <ProfileBox>
                {comment.user.avatar_url.startsWith('profile/') ? (
                  <Img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${comment.user.avatar_url}`}
                    alt="User Avatar"
                  />
                ) : (
                  <Img src={comment.user.avatar_url} alt="User Avatar" />
                )}
                <Name>{comment.user.name}</Name>
              </ProfileBox>
              {isEditId === comment.id ? (
                <input value={edit} onChange={onChangeEdit} style={{ width: '50%' }} />
              ) : (
                <Content>{comment.body}</Content>
              )}
            </CommentBox>
          </>
        );
      })}
      {/* 더보기 버튼 */}
      {showButton && hasNextPage && <MoreButton onClick={fetchMore}>더보기</MoreButton>}
    </Layout>
  );
};

export default Comments;

const Layout = styled.div`
  min-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .custom-btn {
    width: 120px;
    background-color: var(--second-color);
    border-radius: 0 18px 18px 0;
    padding: 10px 16px;
    font-size: 18px;
    font-weight: 700;
  }
`;

const CommentWrite = styled.div`
  width: 900px;
  padding: 20px 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
`;

const Input = styled.input`
  width: 744px;
  height: 40px;
  padding: 2px 15px;
  outline: none;
  border-radius: 20px 0 0 20px;
  border: 2px solid var(--fifth-color);
`;

const ButtonBox = styled.div`
  width: 900px;
  display: flex;
  justify-content: right;
  margin: 5px 0px;
`;

const Button = styled.button`
  width: 60px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--second-color);
  background-color: var(--third-color);
  margin-right: 5px;
`;

const CommentBox = styled.div`
  width: 880px;
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 18px;
  border: 2px solid var(--fifth-color);
`;

const DateBox = styled.div`
  display: flex;
  float: right;
  align-items: center;
  padding: 0 10px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  font-size: 14px;
`;

const ProfileBox = styled.div`
  width: 150px;
  display: flex;
  float: left;
  align-items: center;
  padding: 0 20px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const Name = styled.div`
  font-weight: 600;
  padding: 0 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
`;

const MoreButton = styled.button`
  width: 100px;
  font-weight: 600;
  margin: 10px 0 20px 0;
`;
