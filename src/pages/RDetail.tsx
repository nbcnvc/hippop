import Edit from '../components/community/write/Edit';
import Writer from '../components/community/detail/Writer';
import Comments from '../components/community/detail/Comments';

import moment from 'moment';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCurrentUser } from '../store/userStore';
import { deletePost, getPost } from '../api/post';
import { styled } from 'styled-components';

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
      alert('삭제되었습니다!');

      // 메인 페이지로 이동
      navigate('/review');
    }
  };

  // Post 수정
  const editButton = () => {
    setIsEdit(!isEdit);
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <Layout>
      <CategoryBox>
        <Category>Review</Category>
      </CategoryBox>
      {post && (
        <>
          {/* 글 내용 */}
          <div>
            {isEdit ? (
              <Edit
                postId={post.id}
                postTitle={post.title}
                postBody={post.body}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            ) : (
              <>
                {/* {currentUser?.id === post.user_id && (
                  <>
                    <button onClick={() => deleteButton(post.id)}>삭제</button>
                    <button onClick={editButton}>수정</button>
                  </>
                )} */}
                <div className="ql-snow">
                  <HeadContainer>
                    <TextBox>
                      <Text>{post.store.title}</Text>
                      <Text>{formatDate}</Text>
                    </TextBox>
                    <Title>{post.title}</Title>
                  </HeadContainer>
                  <Body className="ql-editor" dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
              </>
            )}
          </div>
          {/* 작성자 */}
          {isEdit ? <></> : <Writer writer={post.user} postId={postId} />}
          {/* 댓글 */}
          {isEdit ? <></> : <Comments postId={post.id} />}
        </>
      )}
    </Layout>
  );
};

export default RDetail;

const Layout = styled.div`
  min-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryBox = styled.div`
  width: 900px;
`;

const Category = styled.h1`
  color: var(--fifth-color);
  margin: 30px 0;
  padding-bottom: 5px;
  font-size: 24px;
  float: left;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const HeadContainer = styled.div`
  width: 900px;
  height: 100px;
  margin: 10px 0px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 10px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  float: left;
  margin: 10px;
`;

const Body = styled.div`
  width: 900px;
`;
