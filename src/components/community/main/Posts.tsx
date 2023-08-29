import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

import { FetchPost, PostType } from '../../../types/types';
import { getPosts } from '../../../api/post';

import DefaultImg from '../../../assets/defaultImg.png';
import { display } from '@mui/system';
import { styled } from 'styled-components';

const Posts = () => {
  const navigate = useNavigate();
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

  const selectPosts = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);
  // console.log(selectPosts);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView: any) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 대표이미지
  const extractImageTags = (html: string) => {
    const imageTags = [];
    const pattern = /<img.*?src=["'](.*?)["'].*?>/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      imageTags.push(match[1]);
    }

    return imageTags;
  };
  const imageTags = selectPosts?.map((post) => extractImageTags(post.body)).flat();

  // 상세페이지로 넘어가기
  const naviDetail = (post: PostType) => {
    if (pathname === '/review') {
      navigate(`/rdetail/${post.id}`);
    } else navigate(`/mdetail/${post.id}`);
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      {selectPosts?.map((post) => {
        const imageTags = extractImageTags(post.body);
        const postText = post.body.replace(/<img.*?>/g, '');
        return (
          <div
            key={post.id}
            onClick={() => naviDetail(post)}
            style={{
              width: '50%',
              border: '1px solid black',
              padding: '10px',
              margin: '10px',
              display: 'flex'
            }}
          >
            {imageTags.length > 0 ? (
              <div>
                <img src={imageTags[0]} width={250} height={140} />
              </div>
            ) : (
              <div>
                <img src={DefaultImg} alt="Default Image" width={250} height={140} />
              </div>
            )}
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0 20px 20px' }}>{post.title}</div>
              <ContentBox dangerouslySetInnerHTML={{ __html: postText }} />
            </div>
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

const ContentBox = styled.div`
  color: black;
  margin: 20px 20px 0 20px;
  max-height: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;
