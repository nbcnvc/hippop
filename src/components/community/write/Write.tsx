import Editor from './Editor';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewPost } from '../../../types/types';
import { createPost } from '../../../api/post';
import { WriteProps } from '../../../types/props';
import { useCurrentUser } from '../../../store/userStore';

import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

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
  // const navigate = useNavigate()
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 닫기: 글 작성 모달창 && 검색 모달창 닫기
  const closeButton = () => {
    setSearchModal(false);
    setWriteModal(false);
    setKeyword('');
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
    setKeyword('');

    // 글 작성 모달 닫기
    setWriteModal(false);

    // 상세페이지로 이동
    // if (pathname === "review") {
    //   navigate(`/rdetail/${}`)
    // }
  };

  return (
    <>
      {writeModal && (
        <ModalContainer>
          <ModalBox>
            <ButtonBox1>
              <ArrowBackRoundedIcon onClick={closeWrite} />
              <CloseRoundedIcon onClick={closeButton} />
            </ButtonBox1>
            <div>
              <StoreBox>
                <Store>{storeTitle}</Store>
              </StoreBox>
              <ContentBox>
                <Title>제목</Title>
                <Input value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
                <Title>내용</Title>
                <Editor body={body} setBody={setBody} />
              </ContentBox>
            </div>
            <ButtonBox2>
              <Button onClick={createButton}>등록</Button>
              <Button onClick={closeButton} style={{ backgroundColor: '#2B3467' }}>
                취소
              </Button>
            </ButtonBox2>
          </ModalBox>
        </ModalContainer>
      )}
    </>
  );
};

export default Write;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 800px;
  height: 810px;
  padding: 20px;
  background-color: #fff;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
  position: relative;
`;

const ButtonBox1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StoreBox = styled.div`
  margin: 20px 10px;
`;

const Store = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin: 15px;
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const ContentBox = styled.div`
  margin: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  padding: 10px;
`;

const Input = styled.input`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 715px;
  height: 30px;
  padding: 2px 20px;
  margin-bottom: 10px;
  outline: none;
  border-radius: 18px;
  border: 2px solid var(--fifth-color);
`;
const ButtonBox2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100px;
  margin: 0 10px;
  font-size: 14px;
  font-weight: 700;
`;
