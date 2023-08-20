import Editor from './Editor';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewPost } from '../../../types/types';
import { createPost } from '../../../api/post';
import { WriteProps } from '../../../types/props';

import { styled } from 'styled-components';

const Write = ({ writeModal, setWriteModal }: WriteProps) => {
  const [category, setCategory] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.target.value));
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 글 작성 모달창 닫기
  const closeButton = () => {
    setWriteModal(false);
  };

  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  const createButton = () => {
    // 유효성 검사
    if (category === 0) {
      return alert('카테고리를 선택해주세요.');
    }
    if (!title) {
      return alert('제목을 입력해주세요.');
    }
    if (title.length > 35) {
      return alert('제목은 25글자 이하로 입력해주세요.');
    }
    if (!body) {
      return alert('내용을 입력해주세요.');
    }

    // newPost 선언
    const newPost: NewPost = {
      // user_id: '짱구',
      // store_id: 1,
      ctg_index: category,
      title,
      body
    };

    // DB 추가
    createMutation.mutate(newPost);

    // 입력값 초기화
    setCategory(0);
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
            <div>
              <select onChange={onChangeCategory}>
                <option value={0}>카테고리를 선택해주세요</option>
                <option value={1}>팝업후기</option>
                <option value={2}>팝업메이트</option>
              </select>
              <div>
                <span>제목 : </span>
                <input
                  value={title}
                  onChange={onChangeTitle}
                  placeholder="제목은 25글자 이하로 입력해주세요."
                  style={{ width: '600px' }}
                />
              </div>
              <div>
                <Editor setBody={setBody} />
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
