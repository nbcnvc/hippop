import Edit from '../components/community/write/Edit';
import Writer from '../components/community/detail/Writer';
import Comments from '../components/community/detail/Comments';

import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deletePost, getPost } from '../api/post';
import { useCurrentUser } from '../store/userStore';

import { St } from './style/St.MDetail';
import { Skeleton } from '@mui/material';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

const MDetail = () => {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // Post 상세 조회
  const { data: post, isLoading, isError } = useQuery(['post', postId], () => getPost(postId));

  // 날짜 포맷
  const formatDate = moment(post?.created_at).format('YYYY.MM.DD HH:mm');

  // Post 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    }
  });
  const deleteButton = (id: number) => {
    // 삭제 확인
    const confirm = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);

      // 상세페이지 모달 창 닫기
      toast.info('삭제되었습니다 ! :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      // 메인 페이지로 이동
      navigate('/review');
    }
  };

  // Post 수정
  const editButton = () => {
    setIsEdit(!isEdit);
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        {' '}
        <St.Layout>
          <St.CategoryBox>
            <div>
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <St.ButtonBox>
              <div style={{ marginRight: '20px', marginBottom: '23px' }}></div>
              <div style={{ marginRight: '12px', marginBottom: '23px' }}></div>
            </St.ButtonBox>
          </St.CategoryBox>
          {/* 글 내용 */}
          <div>
            <div className="ql-snow">
              <St.HeadContainer>
                <St.TextBox>
                  <St.StoreBox>
                    <Skeleton variant="text" width={300} height={30} />
                  </St.StoreBox>
                  <Skeleton variant="text" width={100} height={30} />
                </St.TextBox>
                <Skeleton variant="text" width={300} height={30} />
              </St.HeadContainer>
              <Skeleton variant="text" width={850} height={500} />
            </div>
          </div>
          <Skeleton variant="text" width={850} height={100} />
          {/* 댓글 목록 */}
          <div>
            <St.ButtonBox></St.ButtonBox>
            <Skeleton variant="text" width={870} height={80} />
            <St.ButtonBox></St.ButtonBox>
            <Skeleton variant="text" width={870} height={80} />
          </div>
          {/* 더보기 버튼 */}
        </St.Layout>
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {isEdit && (
        <Edit postId={post.id} postTitle={post.title} postBody={post.body} isEdit={isEdit} setIsEdit={setIsEdit} />
      )}
      <St.Layout>
        <St.CategoryBox>
          <St.Category>
            <St.TitleLine>Mate</St.TitleLine>
          </St.Category>
          {currentUser?.id === post.user_id && (
            <St.ButtonBox>
              <St.Button onClick={() => deleteButton(post.id)} style={{ marginRight: '10px' }}>
                삭제
              </St.Button>
              <St.Button onClick={editButton}>수정</St.Button>
            </St.ButtonBox>
          )}
        </St.CategoryBox>
        {post && (
          <>
            {/* 글 내용 */}
            <St.HeadContainer>
              <St.TextBox>
                <St.StoreBox>
                  <RoomRoundedIcon /> &nbsp;
                  <St.Text>{post.store.title}</St.Text>
                </St.StoreBox>
                <St.Text>{formatDate}</St.Text>
              </St.TextBox>
              <St.Title>{post.title}</St.Title>
            </St.HeadContainer>
            <St.BodyContainer className="ql-snow">
              <St.Body className="ql-editor" dangerouslySetInnerHTML={{ __html: post.body }} />
            </St.BodyContainer>
            {/* 작성자 */}
            <Writer writer={post.user} postId={postId} />
            {/* 댓글 */}
            <Comments postId={post.id} />
          </>
        )}
      </St.Layout>
    </>
  );
};

export default MDetail;
