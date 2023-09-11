// 라이브러리
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
// zustand
import { useCurrentUser } from '../store/userStore';
// api
import { deletePost, getPost } from '../api/post';
// 컴포넌트
import Edit from '../components/community/write/Edit';
import Writer from '../components/community/detail/Writer';
import Comments from '../components/community/detail/Comments';
// mui
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from '@mui/material/Skeleton';

const RDetail = () => {
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
      window.scrollTo(0, 0);
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        {' '}
        <Layout>
          <CategoryBox>
            <Category>
              <Skeleton variant="text" width={100} height={30} />
            </Category>
            <ButtonBox>
              <div style={{ marginRight: '20px', marginBottom: '23px' }}>
                <Skeleton variant="text" width={40} height={30} />
              </div>
              <div style={{ marginRight: '12px', marginBottom: '23px' }}>
                <Skeleton variant="text" width={40} height={30} />
              </div>
            </ButtonBox>
          </CategoryBox>

          {/* 글 내용 */}
          <div>
            <div className="ql-snow">
              <HeadContainer>
                <TextBox>
                  <StoreBox>
                    {/* <RoomRoundedIcon /> &nbsp; */}
                    <Skeleton variant="text" width={300} height={30} />
                  </StoreBox>
                  <Skeleton variant="text" width={100} height={30} />
                </TextBox>
                <Skeleton variant="text" width={300} height={30} />
              </HeadContainer>
              <Skeleton variant="text" width={850} height={500} />
            </div>
          </div>
          <Skeleton variant="text" width={850} height={100} />
          {/* 댓글 목록 */}
          <div>
            <ButtonBox></ButtonBox>
            <Skeleton variant="text" width={870} height={80} />
            <ButtonBox></ButtonBox>
            <Skeleton variant="text" width={870} height={80} />
            {/* <CommentBox></CommentBox> */}
          </div>
          {/* 더보기 버튼 */}
        </Layout>
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
      <Layout>
        <CategoryBox>
          <Category>
            <TitleLine>Review</TitleLine>
          </Category>
          {currentUser?.id === post.user_id && (
            <ButtonBox>
              <Button onClick={() => deleteButton(post.id)} style={{ marginRight: '10px' }}>
                삭제
              </Button>
              <Button onClick={editButton}>수정</Button>
            </ButtonBox>
          )}
        </CategoryBox>
        {post && (
          <>
            {/* 글 내용 */}
            <div>
              <div className="ql-snow">
                <HeadContainer>
                  <TextBox>
                    <StoreBox>
                      <RoomRoundedIcon /> &nbsp;
                      <Text>{post.store.title}</Text>
                    </StoreBox>
                    <Text>{formatDate}</Text>
                  </TextBox>
                  <Title>{post.title}</Title>
                </HeadContainer>
                <Body className="ql-editor" dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
            </div>
            {/* 작성자 */}
            <Writer writer={post.user} postId={postId} />
            {/* 댓글 */}
            <Comments postId={post.id} />
          </>
        )}
      </Layout>
    </>
  );
};

export default RDetail;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryBox = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.h1`
  color: var(--fifth-color);
  margin: 30px 0 10px 0;
  font-size: 24px;
  float: left;
`;

const TitleLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
`;

const Button = styled.button`
  width: 60px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--second-color);
  background-color: var(--third-color);
`;

const HeadContainer = styled.div`
  width: 900px;
`;

const StoreBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0px 10px 0px;
  border-bottom: 2px dashed var(--fifth-color);
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-right: 5px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  float: left;
  padding: 10px 0px 30px 10px;
`;

const Body = styled.div`
  width: 900px;
  min-height: 500px;
  margin: 20px 0;
`;
