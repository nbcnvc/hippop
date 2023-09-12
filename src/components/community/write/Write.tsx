import Editor from './Editor';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewPost } from '../../../types/types';
import { createPost } from '../../../api/post';
import { WriteProps } from '../../../types/props';
import { useCurrentUser } from '../../../store/userStore';

import { St } from './style/St.Write';

const Write = ({
  setKeyword,
  writeModal,
  setWriteModal,
  setSearchModal,
  storeId,
  storeTitle,
  setResult
}: WriteProps) => {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 닫기: 글 작성 모달창 && 검색 모달창 닫기
  const closeButton = () => {
    const confirm = window.confirm(`작성중인 내용이 사라집니다. 작성을 취소하시겠습니까?`);
    if (confirm) {
      setSearchModal(false);
      setWriteModal(false);
      setKeyword('');
      document.body.style.overflow = 'auto';
    }
  };

  // 이전: 글 작성 모달창 닫기
  const closeWrite = () => {
    setWriteModal(false);
    setSearchModal(true);
    setResult(null);
    setKeyword('');
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
      toast.info('제목을 먼저 입력해주세요 :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    if (title.length > 25) {
      toast.info('제목은 25글자 이하로 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    if (!body) {
      toast.info('내용을 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    if (body === `<p><br></p>`) {
      toast.info('내용을 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
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
    setKeyword('');

    // 글 작성 모달 닫기
    setWriteModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {writeModal && (
        <St.ModalContainer>
          <St.ModalBox>
            <St.ButtonBox1>
              <St.BackButton onClick={closeWrite} />
              <St.XButton onClick={closeButton} />
            </St.ButtonBox1>
            <div>
              <St.StoreBox>
                <St.Picker /> &nbsp;
                <St.Store>{storeTitle}</St.Store>
              </St.StoreBox>
              <St.ContentBox>
                <St.Title>제목</St.Title>
                <St.Input value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
                <St.Title>내용</St.Title>
                <Editor body={body} setBody={setBody} />
              </St.ContentBox>
            </div>
            <St.ButtonBox2>
              <St.Button onClick={createButton}>등록</St.Button>
              <St.Button onClick={closeButton} style={{ backgroundColor: '#2B3467' }}>
                취소
              </St.Button>
            </St.ButtonBox2>
          </St.ModalBox>
        </St.ModalContainer>
      )}
    </>
  );
};

export default Write;
