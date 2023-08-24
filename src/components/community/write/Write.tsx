import Editor from './Editor';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

import { NewPost, Post } from '../../../types/types';
import { createPost } from '../../../api/post';
import { WriteProps } from '../../../types/props';
import { useCurrentUser } from '../../../store/userStore';

const Write = ({ writeModal, setWriteModal, setSearchModal, storeId, storeTitle, setResult }: WriteProps) => {
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Post 상세 조회
  // const { data: Post } = useQuery<Post | null>({ queryKey: ['post', id], queryFn: () => fetchDetailData(id) });

  // 닫기: 글 작성 모달창 && 검색 모달창 닫기
  const closeButton = () => {
    setSearchModal(false);
    setWriteModal(false);
  };

  // 이전: 글 작성 모달창 닫기
  const closeWrite = () => {
    setWriteModal(false);
    setSearchModal(true);
    setResult(null);
  };

  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`, pathname] });
    }
  });

  const createButton = () => {
    // 유효성 검사
    if (!title) {
      return alert('제목을 입력해주세요.');
    }
    if (title.length > 35) {
      return alert('제목은 25글자 이하로 입력해주세요.');
    }
    if (!body) {
      return alert('내용을 입력해주세요.');
    }

    // 카테고리 설정
    let ctg_index = 0;
    if (pathname === '/review') {
      ctg_index = 1;
    }
    if (pathname === '/mate') {
      ctg_index = 2;
    }

    // newPost 선언
    const newPost: NewPost = {
      user_id: currentUser?.id,
      store_id: storeId,
      ctg_index,
      title,
      body
    };

    // DB 추가
    createMutation.mutate(newPost);

    // 입력값 초기화
    setTitle('');
    setBody('');

    // 글 작성 모달 닫기
    setWriteModal(false);
  };

  return (
    <>
      {writeModal && (
        <ModalContainer>
          <ModalBox>
            <button onClick={closeButton}>닫기</button>
            <button onClick={closeWrite}>이전</button>
            <div>
              <div>
                <div>어떤 팝업 ? {storeTitle}</div>
                <span>제목 : </span>
                <input
                  value={title}
                  onChange={onChangeTitle}
                  placeholder="제목은 25글자 이하로 입력해주세요."
                  style={{ width: '600px' }}
                />
              </div>
              <div>
                <Editor body={body} setBody={setBody} />
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '3%' }}>
              <button onClick={createButton}>등록</button>
            </div>
          </ModalBox>
        </ModalContainer>
      )}
    </>
  );
};

export default Write;

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
  width: 800px;
  height: 800px;
  border-radius: 10px;
  position: relative;
`;
