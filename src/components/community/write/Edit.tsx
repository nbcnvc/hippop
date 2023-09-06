import Editor from './Editor';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditProps } from '../../../types/props';
import { updatePost } from '../../../api/post';
import { useParams } from 'react-router-dom';

import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = ({ postId, postTitle, postBody, isEdit, setIsEdit }: EditProps) => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>(postTitle);
  const [body, setBody] = useState<string>(postBody);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 취소 버튼
  const cancelButton = () => {
    const confirm = window.confirm(`수정중인 내용이 사라집니다. 수정을 취소하시겠습니까?`);
    if (confirm) {
      setIsEdit(!isEdit);
      document.body.style.overflow = 'auto';
    }
  };

  // Post 수정
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', Number(id)]);
    }
  });
  const saveButton = () => {
    // 유효성 검사
    if (!title) {
      toast.info('제목을 먼저 입력해주세요 :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      // alert('제목을 입력해주세요.');
      return;
    }
    if (title.length > 30) {
      toast.info('제목은 30글자 이하로 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      // alert('제목은 30글자 이하로 입력해주세요.');
      return;
    }
    if (!body) {
      toast.info('내용을 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      // alert('내용을 입력해주세요.');
      return;
    }
    if (body === `<p><br></p>`) {
      toast.info('내용을 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      // alert('내용을 입력해주세요.');
      return;
    }

    // 수정된 내용
    const updatePost = {
      id: postId,
      title,
      body
    };
    // DB 수정
    updateMutation.mutate(updatePost);

    // 수정 여부
    setIsEdit(!isEdit);
    document.body.style.overflow = 'auto';
  };

  return (
    <ModalContainer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        // hideProgressBar={true}
        newestOnTop={true}
        // closeOnClick={true}
        // rtl={true}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        limit={1}
        style={{ zIndex: 9999 }}
      />
      <ModalBox>
        <ButtonBox>
          <XButton onClick={cancelButton} />
          <Button onClick={saveButton}>저장</Button>
        </ButtonBox>
        <ContentBox>
          <Title>제목</Title>
          <Input value={title} onChange={onChangeTitle} />
          <Title>내용</Title>
          <Editor body={body} setBody={setBody} />
        </ContentBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default Edit;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 780px;
  height: 730px;
  padding: 20px;
  background-color: #fff;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
  position: relative;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 80px;
  height: 35px;
  font-weight: 600;
  color: var(--second-color);
  background-color: var(--third-color);
`;

const ContentBox = styled.div`
  margin: 10px;
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

const XButton = styled(CloseRoundedIcon)`
  cursor: pointer;
`;
