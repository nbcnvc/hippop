import Editor from './Editor';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditProps } from '../../../types/props';
import { updatePost } from '../../../api/post';
import { useParams } from 'react-router-dom';

import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Edit = ({ postId, postTitle, postBody, isEdit, setIsEdit }: EditProps) => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>(postTitle);
  const [body, setBody] = useState<string>(postBody);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 취소 버튼
  const cancelButton = () => {
    setIsEdit(!isEdit);
  };

  // Post 수정
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', Number(id)]);
    }
  });
  const saveButton = () => {
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
  };

  return (
    <ModalContainer>
      <ModalBox>
        <ButtonBox>
          <CloseRoundedIcon onClick={cancelButton} />
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
