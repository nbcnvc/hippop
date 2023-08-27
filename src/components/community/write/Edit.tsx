import Editor from './Editor';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditProps } from '../../../types/props';
import { PostType } from '../../../types/types';
import { updatePost } from '../../../api/post';
import { useParams } from 'react-router-dom';

const Edit = ({ post, isEdit, setIsEdit }: EditProps) => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
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
  const saveButton = (post: PostType) => {
    // 수정된 Post 선언
    const editPost: PostType = {
      ...post,
      title,
      body
    };
    // DB 수정
    updateMutation.mutate(editPost);

    // 수정 여부
    setIsEdit(!isEdit);
  };

  return (
    <>
      <button onClick={cancelButton}>취소</button>
      <button onClick={() => saveButton(post)}>저장</button>
      <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
      <div>팝업스토어 이름</div>
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
