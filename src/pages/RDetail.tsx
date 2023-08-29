import Edit from '../components/community/write/Edit';
import Writer from '../components/community/detail/Writer';
import Comments from '../components/community/detail/Comments';

import moment from 'moment';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCurrentUser } from '../store/userStore';
import { deletePost, getPost } from '../api/post';

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
    <>
      {post && (
        <>
          {/* 작성자 */}
          {isEdit ? <></> : <Writer writer={post.user} postId={postId} />}
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
                {currentUser?.id === post.user_id && (
                  <>
                    <button onClick={() => deleteButton(post.id)}>삭제</button>
                    <button onClick={editButton}>수정</button>
                  </>
                )}
                <div
                  className="ql-snow"
                  style={{ width: '1000px', border: '1px solid black', padding: '10px', margin: '10px' }}
                >
                  <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
                  <div>어떤 팝업? {post.store.title}</div>
                  <div>작성일자 : {formatDate}</div>
                  <div>제목 : {post.title}</div>
                  <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
              </>
            )}
          </div>
          {/* 댓글 */}
          {isEdit ? <></> : <Comments postId={post.id} />}
        </>
      )}
    </>
  );
};

export default RDetail;