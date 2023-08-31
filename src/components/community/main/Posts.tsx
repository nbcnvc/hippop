import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

import { FetchPost, PostType } from '../../../types/types';
import { getPosts } from '../../../api/post';

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
  console.log(selectPosts);

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
    <PostContainer>
      {selectPosts?.map((post) => {
        const imageTags = extractImageTags(post.body);
        const postText = post.body.replace(/<img.*?>/g, '');
        return (
          <PostBox key={post.id} onClick={() => naviDetail(post)}>
            {imageTags.length > 0 ? (
              <div>
                <ImageBox src={imageTags[0]} />
              </div>
            ) : (
              <div>
                <ImageBox src="/asset/defaultImg.png" alt="Default Image" width={250} height={140} />
              </div>
            )}
            <ContentBox>
              <Store>{post.store.title}</Store>
              <Title>{post.title}</Title>
              <Body dangerouslySetInnerHTML={{ __html: postText }} />
            </ContentBox>
          </PostBox>
        );
      })}
      <Trigger ref={ref} />
    </PostContainer>
  );
};

export default Posts;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  width: 900px;
  height: 200px;
  background-color: #fff;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

const ImageBox = styled.img`
  width: 340px;
  height: 190px;
  border: 2px solid var(--fifth-color);
  border-radius: 10px;
  margin: 3px 5px 0 5px;
  object-fit: cover;
`;

const ContentBox = styled.div`
  width: 505px;
  padding: 10px 20px;
`;

const Store = styled.div`
  font-weight: 400;
  padding: 10px 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 10px 0;
`;

const Body = styled.div`
  color: black;
  font-size: 14px;
  line-height: 1.5;
  max-height: 85px;
  padding-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;

const Trigger = styled.div`
  width: 100%;
  align-items: center;
`;
