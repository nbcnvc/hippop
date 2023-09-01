import moment from 'moment';
import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

import { FetchPost } from '../../../types/types';
import { getPosts } from '../../../api/post';

import { styled } from 'styled-components';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

const MPosts = () => {
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

  // 상세페이지로 넘어가기
  const naviDetail = (post: any) => {
    navigate(`/mdetail/${post.id}`);
  };

  // 프로필로 넘어가기
  const naviProfile = (userId: string) => {
    navigate(`/yourpage/${userId}`);
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
        const postText = post.body.replace(/<img.*?>/g, '');
        return (
          <PostBox key={post.id}>
            <ContentBox>
              <Between>
                <Between>
                  <RoomRoundedIcon /> &nbsp;
                  <Store>{post.store.title}</Store>
                </Between>
                <Date>{moment(post?.created_at).format('YYYY.MM.DD HH:mm')}</Date>
              </Between>
              &nbsp;<Title>{post.title}</Title>
              <Between>
                <Body dangerouslySetInnerHTML={{ __html: postText }} />
                <Button onClick={() => naviDetail(post)}>상세보기</Button>
              </Between>
            </ContentBox>
            <ProfileBox>
              <Between>
                <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.user.avatar_url}`} alt="User Avatar" />
                <div>
                  <Name style={{ marginBottom: '5px' }}>
                    <NameLine>{post.user.name}</NameLine>
                  </Name>
                  <Name>님과 함께 하기</Name>
                </div>
              </Between>
              <ProfileButton onClick={() => naviProfile(post.user.id)}>프로필</ProfileButton>
            </ProfileBox>
          </PostBox>
        );
      })}
      <Trigger ref={ref} />
    </PostContainer>
  );
};

export default MPosts;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  max-width: 1920px;
  min-width: 900px;
  height: 160px;
  background-color: #fff;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

const ContentBox = styled.div`
  width: 600px;
  padding: 10px 20px;
  border-right: 2px dashed var(--fifth-color);
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Store = styled.div`
  font-weight: 600;
  padding: 10px 0;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Body = styled.div`
  height: 65px;
  width: 430px;
  color: black;
  font-size: 14px;
  line-height: 1.5;
  max-height: 85px;
  padding: 20px 0 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;

const Date = styled.div`
  margin: 0 0 0 5px;
  font-size: 14px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 80px;
  font-size: 14px;
  margin-top: 45px;
`;

const ProfileBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0 25px;
`;

const NameLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  margin: 10px 0 10px 20px;
  object-fit: cover;
  border-radius: 50%;
`;

const Trigger = styled.div`
  width: 100%;
  align-items: center;
`;

const ProfileButton = styled.button`
  width: 80px;
  font-size: 14px;
  margin: 13px 0 0 150px;
`;
