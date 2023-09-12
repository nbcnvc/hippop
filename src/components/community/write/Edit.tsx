import Editor from './Editor';

import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditProps } from '../../../types/props';
import { updatePost } from '../../../api/post';

import { St } from './style/St.Edit';

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
      return;
    }
    if (title.length > 30) {
      toast.info('제목은 30글자 이하로 입력해주세요.', {
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
    <St.ModalContainer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={true}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        limit={1}
        style={{ zIndex: 9999 }}
      />
      <St.ModalBox>
        <St.ButtonBox>
          <St.XButton onClick={cancelButton} />
          <St.Button onClick={saveButton}>저장</St.Button>
        </St.ButtonBox>
        <St.ContentBox>
          <St.Title>제목</St.Title>
          <St.Input value={title} onChange={onChangeTitle} />
          <St.Title>내용</St.Title>
          <Editor body={body} setBody={setBody} />
        </St.ContentBox>
      </St.ModalBox>
    </St.ModalContainer>
  );
};

export default Edit;
