import moment from 'moment';
import shortid from 'shortid';
import { useNavigate } from 'react-router';
import React, { useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Comment } from '../../../types/types';
import { CommentProps } from '../../../types/props';
import { useCurrentUser } from '../../../store/userStore';
import { createComment, deleteComment, getComments, updateComment } from '../../../api/comment';

import { Skeleton } from '@mui/material';
import { St } from './style/St.Comments';

const Comments = ({ postId }: CommentProps) => {
  const navigate = useNavigate();
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
      toast.info('로그인을 해주세요', {
        className: 'custom-toast',
        theme: 'light'
      });
      setBody('');
      return;
    }
    if (!body) {
      toast.info('댓글을 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    if (body.length > 35) {
      toast.info('댓글은 35글자 미만으로 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
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
      toast.info('삭제되었습니다!', {
        className: 'custom-toast',
        theme: 'light'
      });
      // alert('삭제되었습니다!');
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

  // 프로필로 넘어가기
  const naviProfile = (userId: string | undefined) => {
    navigate(`/yourpage/${shortid.generate()}`, { state: { userId: userId } });
  };

  if (isLoading) {
    return (
      <div>
        <St.Layout>
          {/* 댓글 입력창 */}
          <St.CommentWrite>
            <Skeleton variant="text" width={40} height={30} />
            <div style={{ display: 'flex' }}>
              <Skeleton variant="text" width={750} height={50} />
              <div style={{ marginLeft: '30px' }}>
                <Skeleton variant="text" width={70} height={50} />
              </div>
            </div>
          </St.CommentWrite>
          {/* 댓글 목록 */}
          <St.CommentContainer>
            <St.ButtonBox>
              <div style={{ marginRight: '20px' }}></div>
              <div style={{ marginRight: '12px' }}></div>
            </St.ButtonBox>
            <Skeleton variant="text" width={870} height={80} />
            <St.ButtonBox>
              <div style={{ marginRight: '20px' }}></div>
              <div style={{ marginRight: '12px' }}></div>
            </St.ButtonBox>
            <Skeleton variant="text" width={870} height={80} />
            {/* <CommentBox></CommentBox> */}
          </St.CommentContainer>
          {/* 더보기 버튼 */}
        </St.Layout>
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <St.Layout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={true}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        limit={1}
        style={{ zIndex: 9999 }}
      />
      {/* 댓글 입력창 */}
      <St.CommentWrite>
        <St.Title>댓글</St.Title>
        <St.WriteBox>
          {currentUser ? (
            <>
              <St.Input
                value={body}
                onChange={onChangeBody}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    createButton();
                  }
                }}
                placeholder="댓글을 입력해주세요."
                disabled={!currentUser} // 로그인하지 않은 경우 input 비활성화
              />
              <button className="custom-btn" onClick={createButton}>
                등록
              </button>
            </>
          ) : (
            <>
              <St.Input
                value={body}
                onChange={onChangeBody}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    createButton();
                  }
                }}
                placeholder="로그인 후 댓글을 입력해주세요."
                disabled={!currentUser}
              />
              <button className="custom-btn" onClick={createButton}>
                등록
              </button>
            </>
          )}
        </St.WriteBox>
      </St.CommentWrite>
      {/* 댓글 목록 */}
      {selectComments?.map((comment) => {
        return (
          <St.CommentContainer key={comment.id}>
            {currentUser?.id === comment.user_id && (
              <St.ButtonBox>
                <St.Button onClick={() => deleteButton(comment.id)}>삭제</St.Button>
                <St.Button onClick={() => editButton(comment)}>{isEditId ? '저장' : '수정'}</St.Button>
              </St.ButtonBox>
            )}
            <St.CommentBox>
              <St.DateBox>
                <St.Date>{moment(comment.created_at).format('YYYY.MM.DD HH:mm')}</St.Date>
              </St.DateBox>
              <St.ProfileBox>
                {comment.user.avatar_url && (
                  <St.Img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${comment.user.avatar_url}`}
                    alt="User Avatar"
                    onClick={() => {
                      naviProfile(comment.user.id);
                    }}
                  />
                )}

                <St.Name
                  onClick={() => {
                    naviProfile(comment.user.id);
                  }}
                >
                  {comment.user.name}
                </St.Name>
              </St.ProfileBox>
              {isEditId === comment.id ? (
                <St.EditInput value={edit} onChange={onChangeEdit} />
              ) : (
                <St.Content>{comment.body}</St.Content>
              )}
            </St.CommentBox>
          </St.CommentContainer>
        );
      })}
      {/* 더보기 버튼 */}
      <St.MoreButtonBox>
        {showButton && hasNextPage && <St.MoreButton onClick={fetchMore}>더보기</St.MoreButton>}
      </St.MoreButtonBox>
    </St.Layout>
  );
};

export default Comments;
