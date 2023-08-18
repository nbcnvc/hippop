import Editor from './Editor';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewPost } from '../../../types/types';
import { createPost } from '../../../api/post';

const Write = () => {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 검사

    // newPost 선언
    const newPost: NewPost = {
      category,
      title,
      body
    };

    // DB 추가
    createMutation.mutate(newPost);

    // 글 작성 모달 닫기
  };

  return (
    <>
      <button>닫기</button>
      <form onSubmit={onSubmitHandler}>
        <select onChange={onChangeCategory}>
          <option value={''}>카테고리를 선택해주세요</option>
          <option value={'팝업후기'}>팝업후기</option>
          <option value={'팝업메이트'}>팝업메이트</option>
        </select>
        <div>
          <span>제목 : </span>
          <input value={title} onChange={onChangeTitle} />
        </div>
        <Editor setBody={setBody} />
        <div>
          <button>등록</button>
        </div>
      </form>
      {/* <div dangerouslySetInnerHTML={{ __html: body }} /> */}
    </>
  );
};

export default Write;
