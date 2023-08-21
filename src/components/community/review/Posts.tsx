import { useQuery } from '@tanstack/react-query';

import { fetchPosts } from '../../../api/post';
import { Post } from '../../../types/types';
import { PostsProps } from '../../../types/props';

const Posts = ({ setPost }: PostsProps) => {
  const { isLoading, isError, data: posts } = useQuery<Post[]>(['posts'], fetchPosts);

  // 상세페이지 모달 열기
  const openDetail = (post: Post) => {
    setPost(post);
  };

  if (isLoading) {
    <div>로딩중입니다.</div>;
  }
  if (isError) {
    <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {posts?.map((post) => {
        return (
          <div
            key={post.id}
            onClick={() => openDetail(post)}
            style={{ width: '70%', border: '1px solid black', padding: '10px' }}
          >
            <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
            <div>제목 : {post.title}</div>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
