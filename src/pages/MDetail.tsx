import Edit from '../components/community/write/Edit';
import Writer from '../components/community/detail/Writer';
import Comments from '../components/community/detail/Comments';

import moment from 'moment';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCurrentUser } from '../store/userStore';
import { getUser } from '../api/user';
import { fetchDetailData } from '../api/store';
import { deletePost, getPost } from '../api/post';
import { PostType, Store, UserInfo } from '../types/types';

const MDetail = () => {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [writerInfo, setWriterInfo] = useState<UserInfo>();

  // Post 상세 조회
  const {
    data: post,
    isLoading: isLoading1,
    isError: isError1
  } = useQuery<PostType | null>(['post', postId], () => getPost(postId));

  // 작성자 정보 조회
  const writerId = post?.user_id;
  const {
    data: writer,
    isLoading: isLoading2,
    isError: isError2
  } = useQuery<UserInfo | null>(['writer', writerId], () => getUser(writerId ?? ''), {
    onSuccess: (data) => {
      if (data) setWriterInfo(data);
    }
  });

  // Store 상세 조회
  const storeId = post?.store_id;
  const { data: store } = useQuery<Store | null>({
    queryKey: ['store', storeId],
    queryFn: () => fetchDetailData(storeId ?? 0)
  });

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

  if (isLoading1 || isLoading2) {
    return <div>로딩중입니다.</div>;
  }
  if (isError1 || isError2) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {post && (
        <>
          {/* 작성자 */}
          {isEdit ? <></> : <Writer writer={writerInfo} postId={postId} />}
          {/* 글 내용 */}
          <div>
            {isEdit ? (
              <Edit post={post} isEdit={isEdit} setIsEdit={setIsEdit} />
            ) : (
              <>
                {currentUser?.id === post?.user_id && (
                  <>
                    <button onClick={() => deleteButton(post.id)}>삭제</button>
                    <button onClick={editButton}>수정</button>
                  </>
                )}
                <div
                  className="ql-snow"
                  style={{ width: '95%', border: '1px solid black', padding: '20px', margin: '10px' }}
                >
                  <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
                  <div>어떤 팝업? {store?.title}</div>
                  <div>작성일자 : {formatDate}</div>
                  <div>제목 : {post.title}</div>
                  <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
              </>
            )}
          </div>
          {/* 댓글 */}
          {isEdit ? <></> : <Comments post={post} />}
        </>
      )}
    </>
  );
};

export default MDetail;
