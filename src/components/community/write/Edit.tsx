import Editor from './Editor';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { EditProps } from '../../../types/props';
import { Post } from '../../../types/types';
import { updatePost } from '../../../api/post';

const Edit = ({ post, setPost, isEdit, setIsEdit }: EditProps) => {
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Post 수정
  const updateMutation = useMutation(updatePost);
  const saveButton = (post: Post) => {
    const editPost: Post = {
      ...post,
      title,
      body
    };
    updateMutation.mutate(editPost);
    // 수정한 게시글 바로 보여주기
    setPost(editPost);
    // 수정 여부
    setIsEdit(!isEdit);
  };

  return (
    <>
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
