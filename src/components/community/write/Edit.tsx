import Editor from './Editor';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditProps } from '../../../types/props';
import { updatePost } from '../../../api/post';
import { useParams } from 'react-router-dom';

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
    <>
      <button onClick={cancelButton}>취소</button>
      <button onClick={saveButton}>저장</button>
      <div>
        <span>제목 : </span>
        <input value={title} onChange={onChangeTitle} style={{ width: '600px' }} />
        <div>
          <Editor body={body} setBody={setBody} />
        </div>
      </div>
    </>
  );
};

export default Edit;
