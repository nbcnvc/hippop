// 라이브러리
import moment from 'moment';
import shortid from 'shortid';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
// 타입
import { FetchPost } from '../../../../types/types';
// api
import { getPosts } from '../../../../api/post';
// mui
import Skeleton from '@mui/material/Skeleton';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import { ToastContainer } from 'react-toastify';

const MNewPosts = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';

  const { state } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch
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

  useEffect(() => {
    refetch();
  }, [storeId]);

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
  const naviDetail = (post: any) => {
    navigate(`/mdetail/${post.id}`);
  };

  // 프로필로 넘어가기
  const naviProfile = (userId: string) => {
    // navigate(`/yourpage/${userId}`);
    navigate(`/yourpage/${shortid.generate()}`, { state: { userId: userId } });
  };

  if (isLoading) {
    // 로딩 중일 때 스켈레톤 표시
    return (
      <PostContainer>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          // hideProgressBar={true}
          newestOnTop={true}
          // closeOnClick={true}
          // rtl={true}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={true}
          limit={1}
          style={{ zIndex: 9999 }}
        />
        {Array.from({ length: 5 }).map((_, index) => (
          <PostBox key={index}>
            <ContentBox>
              <Between>
                <Between>
                  <Skeleton variant="circular" width={24} height={24} /> &nbsp;
                  <Skeleton width={100} height={24} />
                </Between>
                <Date>
                  <Skeleton width={100} height={12} />
                </Date>
              </Between>
              &nbsp;
              <Title>
                <Skeleton width={400} height={20} />
              </Title>
              <Between>
                <Body>
                  <Skeleton width={400} height={30} />
                </Body>
                <div style={{ marginTop: '46px', marginRight: '12px' }}>
                  <Skeleton width={60} height={16} />
                </div>
              </Between>
            </ContentBox>
            <ProfileBox>
              <Between>
                <Skeleton variant="circular" width={70} height={70} />
                <div>
                  <Name style={{ marginBottom: '5px' }}>
                    <Skeleton width={80} height={20} />
                  </Name>
                  <Name>
                    <Skeleton width={80} height={14} />
                  </Name>
                </div>
              </Between>
              <div style={{ marginTop: '32px', marginLeft: '145px' }}>
                <Skeleton width={60} height={16} />
              </div>
            </ProfileBox>
          </PostBox>
        ))}
        <Trigger ref={ref} />
      </PostContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
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
                </Between>
                <Button onClick={() => naviDetail(post)}>상세보기</Button>
              </ContentBox>
              <ProfileBox>
                <Betweens>
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.user.avatar_url}`} alt="User Avatar" />
                  <div>
                    <Name>
                      <NameLine>
                        <span>{post.user.name}</span>
                        님과
                      </NameLine>
                    </Name>
                    <Name>함께 하기</Name>
                  </div>
                </Betweens>
                <ProfileButton onClick={() => naviProfile(post.user.id)}>프로필</ProfileButton>
              </ProfileBox>
            </PostBox>
          );
        })}
        <Trigger ref={ref} />
      </PostContainer>
    </>
  );
};

export default MNewPosts;

// 미디어 쿼리 세팅
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;
const PostContainer = styled.div`
  max-width: 1920px;
  min-width: 744px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  ${mediaQuery(900)}
`;

const PostBox = styled.div`
  width: 100%;
  height: 240px;
  background-color: #fff;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
  display: flex;

  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    border: 3px solid var(--primary-color);
  }
  &:active {
    background-color: rgb(215, 215, 219);
    transform: scale(0.98);
  }
`;

const ContentBox = styled.div`
  width: 70%;
  padding: 10px 25px 10px 20px;
  border-right: 2px dashed var(--fifth-color);
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Betweens = styled.div`
  gap: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 50px;
  @media (max-width: 1600px) {
    justify-content: center;
    flex-direction: column;
    margin-top: -10px;
  }
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
  height: 63px;
  width: 430px;
  color: black;
  font-size: 14px;
  line-height: 1.5;
  padding: 15px 0 0 5px;
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
  float: right;
  width: 80px;
  font-size: 14px;
  margin-top: 42px;
`;

const ProfileBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 10px;
`;

const NameLine = styled.div`
  font-size: 14px;
  // background-color: white;
  // padding: 4px 6px;
  span {
    font-size: 18px;
    padding: 2px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  }
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  margin: 10px 10px 10px 20px;
  object-fit: cover;
  border-radius: 50%;
`;

const Trigger = styled.div`
  width: 100%;
  align-items: center;
`;

const ProfileButton = styled.button`
  float: right;
  width: 80px;
  font-size: 14px;
  margin-right: 0;

  position: absolute;
  top: 185px;
  right: 20px;
  @media (max-width: 1600px) {
    position: relative;
    justify-content: center;
    top: 0;
    // margin-bottom: 50px;
    right: 0;
    // flex-direction: column;
  }
`;
