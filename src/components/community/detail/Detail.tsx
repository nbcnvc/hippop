import Comment from './Comment';

import { styled } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DetailProps } from '../../../types/props';
import { deletePost } from '../../../api/post';

const Detail = ({ post, setPost }: DetailProps) => {
  // 창 닫기 버튼
  const closeDetail = () => {
    setPost(null);
  };

  // 게시글 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });
  const deleteButton = (id: number) => {
    // 삭제 확인
    const confirm = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);

      // 상세페이지 모달 창 닫기
      alert('삭제되었습니다!');
      setPost(null);
    }
  };

  return (
    <ModalContainer>
      <ModalBox>
        <button onClick={closeDetail}>창 닫기</button>
        <button onClick={() => deleteButton(post.id)}>삭제</button>
        <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
        <div>제목 : {post.title}</div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <Comment />
      </ModalBox>
    </ModalContainer>
  );
};

export default Detail;

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
  overflow: auto;
`;
