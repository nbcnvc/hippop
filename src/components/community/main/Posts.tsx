import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

import { FetchPost } from '../../../types/types';
import { getPosts } from '../../../api/post';

const Posts = () => {
  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchPost>({
    queryKey: [`${queryKey}`, pathname],
    queryFn: ({ pageParam }) => getPosts(pageParam, pathname),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
      return null; // 마지막 페이지인 경우
    }
  });
  console.log(posts);

  const selectPosts = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView: any) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 상세페이지로 넘어가기
  const navigate = useNavigate();

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <div>
      {selectPosts?.map((post) => {
        return (
          <div
            key={post.id}
            onClick={() => {
              if (pathname === '/review') {
                navigate(`/rdetail/${post.id}`);
              } else navigate(`/mdetail/${post.id}`);
            }}
            style={{ width: '90%', border: '1px solid black', padding: '20px', margin: '10px' }}
          >
            <div>카테고리 : {(post.ctg_index === 1 && '팝업후기') || (post.ctg_index === 2 && '팝업메이트')}</div>
            <div>제목 : {post.title}</div>
          </div>
        );
      })}
      <div
        style={{
          backgroundColor: 'yellow',
          width: '90%',
          alignItems: 'center',
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
