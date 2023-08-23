import Edit from '../write/Edit';
import Writer from './Writer';
import Comments from './Comments';

import moment from 'moment';
import { useState } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQuery } from '@tanstack/react-query';

import { DetailProps } from '../../../types/props';
import { deletePost } from '../../../api/post';
import { useCurrentUser } from '../../../store/userStore';
import { Store } from '../../../types/types';
import { fetchDetailData } from '../../../api/store';

const Detail = ({ post, setPost }: DetailProps) => {
  const currentUser = useCurrentUser();
  const id = post.store_id;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 날짜 포맷
  const formatDate = moment(post.created_at).format('YYYY.MM.DD HH:mm');

  // Store 상세 조회
  const { data: store } = useQuery<Store | null>({ queryKey: ['detailData', id], queryFn: () => fetchDetailData(id) });

  // 창 닫기 버튼
  const closeDetail = () => {
    setPost(null);
  };

  // Post 삭제
  const deleteMutation = useMutation(deletePost);
  const deleteButton = (id: number) => {
    // 삭제 확인
    const confirm = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);

      // 상세페이지 모달 창 닫기
      alert('삭제되었습니다!');
      setPost(null);
    }
  };

  // Post 수정
  const editButton = () => {
    setIsEdit(!isEdit);
  };

  return (
    <ModalContainer>
      <ModalBox>
        <div>
          <button onClick={closeDetail}>창 닫기</button>
          {currentUser?.id === post.user_id && (
            <>
              <button onClick={() => deleteButton(post.id)}>삭제</button>
              <button onClick={editButton}>수정</button>
            </>
          )}
          {isEdit ? (
            <Edit post={post} setPost={setPost} isEdit={isEdit} setIsEdit={setIsEdit} />
          ) : (
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
          )}
        </div>
        {/* 작성자 */}
        <Writer userId={post.user_id} />
        {/* 댓글 */}
        {isEdit ? <></> : <Comments post={post} />}
      </ModalBox>
    </ModalContainer>
  );
};

export default Detail;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const ModalBox = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 1000px;
  height: 700px;
  border-radius: 10px;
  position: relative;
  overflow: auto;
`;
