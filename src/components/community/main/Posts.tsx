import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { InView, useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import { FetchData, Post } from '../../../types/types';
import { PostsProps } from '../../../types/props';
import { getPosts } from '../../../api/post';

const Posts = ({ setPost }: PostsProps) => {
  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchData>({
    queryKey: [`${queryKey}`, pathname],
    queryFn: ({ pageParam }) => getPosts(pageParam, pathname),
    getNextPageParam: (lastPage) => {
      console.log('lastPage', lastPage);
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
    }
  });

  console.log('posts', posts);

  // select
  const selectPosts = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);

  console.log('selectPosts', selectPosts);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView) => {
      console.log(hasNextPage); // True
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 상세페이지 모달 열기
  const openDetail = (post: Post) => {
    setPost(post);
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <div>
      <h1>글 목록</h1>
      {selectPosts?.map((post) => {
        return (
          <div
            key={post.id}
            onClick={() => openDetail(post)}
            style={{ width: '100%', border: '1px solid black', padding: '20px', margin: '10px' }}
          >
            <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
            <div>제목 : {post.title}</div>
          </div>
        );
      })}

      <div
        style={{
          backgroundColor: 'yellow',
          width: '100%',
          border: '1px solid black',
          padding: '20px',
          margin: '10px'
        }}
        ref={ref}
      >
        Trigger to Fetch Here
      </div>
    </div>
  );
};

export default Posts;
