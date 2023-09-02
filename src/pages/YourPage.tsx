import React, { useState, useEffect, useMemo } from 'react';
// 라이브러리
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { Parser } from 'htmlparser2'; // 문서를 분석해주는 (div, p tag) 라이브러리
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
// api
import { getProfileImg, getUser } from '../api/user'; // 사용자 정보를 가져오는 함수
import { getMyItems, getYourItems } from '../api/post'; // 게시글 가져오는 함수
import { getMyStores } from '../api/store'; // 북마크 가져오는 함수
import { fetchBookMarkStore } from '../api/bookmark';
// 타입
import { UserInfo, Store, PostType } from '../types/types';

// mui
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Review from './Review';

import DefaultImg from '../images/defaultImg.png';

const YourPage = () => {
  const { id } = useParams();
  const userId: string = id as string;
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [activeSection, setActiveSection] = useState('myReview'); // 기본값 설정
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery(['user', id], () => getUser(userId));
  console.log(user);

  const {
    data: bookMarkStore,
    isLoading: isBookMarkLoading,
    isError: isBookMarkError
  } = useQuery(['BookMarkStore', userId], () => fetchBookMarkStore(userId));

  console.log('bookMarkStore', bookMarkStore);
  const handleSectionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const section = button.getAttribute('data-section');

    if (section !== null) {
      setActiveSection(section);
    }
  };

  // 인피니티 스크롤로 필터된 게시글 또는 북마크 가져오기
  const getYourSectionItems = ({
    pageParam,
    activeSection,
    userId
  }: {
    pageParam: number;
    activeSection: string;
    userId: string | undefined; // string 또는 undefined로 타입 설정
  }) => {
    // userId가 undefined이면 빈 문자열로 처리
    const userIdToUse = userId || '';

    if (activeSection === 'myReview') {
      return getYourItems(userIdToUse, 'posts', pageParam);
    }
    return null;
  };

  const {
    data: items,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['yourpage', id, activeSection],
    queryFn: ({ pageParam }) => getYourSectionItems({ pageParam, activeSection, userId: id }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return null;
    }
  });

  // 인피니티 스크롤로 필터된 post 또는 store
  const selectItems = useMemo(() => {
    return items?.pages.map((data) => data.items).flat();
  }, [items]);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 사용자 프로필 이미지 가져오기
  const fetchProfileImage = async () => {
    if (userData) {
      const profileImgData = await getProfileImg(userData.id);
      console.log('Profile Image Data:', profileImgData);

      // if (profileImgData && profileImgData.avatar_url) {
      //   // avatar_url이 존재하면 해당 URL을 사용하여 이미지를 렌더링
      //   `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${profileImgData.avatar_url}`;
      // }
    }
  };

  const PostDetail = (postId: number) => {
    navigate(`/rdetail/${postId}`);
  };

  useEffect(() => {
    if (userData) {
      fetchProfileImage();
    }
  }, [userData]);

  if (isLoading || isUserLoading || isBookMarkLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError || isUserError || isBookMarkError) {
    return <div>Error occurred while fetching user data.</div>;
  }

  return (
    <>
      <Container>
        <UserWrapper>
          <UserBox>
            <Htag>
              <HomeRoundedIcon />
              <HtagLine>{user?.name} </HtagLine>님의 프로필
            </Htag>
            <BoxLine></BoxLine>
            <UserProfile>
              <div>
                {user?.avatar_url?.startsWith('profile/') ? (
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user?.avatar_url}`} alt="User Avatar" />
                ) : (
                  <Img src={user?.avatar_url} alt="User Avatar" />
                )}
              </div>
              <div>
                <Ptag>힙팝메이트</Ptag>
                <Ptag>
                  <SpanLine>{user?.name}</SpanLine>님
                </Ptag>
                {/* <Ptage>{user?.email}</Ptage> */}
              </div>
            </UserProfile>
          </UserBox>
          <div></div>
          <StoreListBox>
            <Htag>
              <HtagLine>북마크한 팝업스토어</HtagLine>
            </Htag>
            <BookMarkList>
              {bookMarkStore?.map((bookMark) => {
                return (
                  <BookMarkWraaper>
                    <BookMarkBox>
                      <div>
                        <StoreList>
                          <p>
                            <RoomRoundedIcon fontSize="large" />
                          </p>
                          <StoreInfo>
                            <div>
                              <Location>
                                {bookMark.store?.location.split(' ').slice(0, 1)}{' '}
                                {bookMark.store?.location.split(' ').slice(1, 2)}
                              </Location>
                            </div>
                            <div>
                              <StoreTitle>{bookMark.store?.title}</StoreTitle>
                            </div>
                          </StoreInfo>
                        </StoreList>
                      </div>
                    </BookMarkBox>
                    <Line></Line>
                  </BookMarkWraaper>
                );
              })}
            </BookMarkList>
          </StoreListBox>
        </UserWrapper>

        <ReviewWrapper>
          <Htag2>
            <HtagLine>작성한 게시글</HtagLine>
          </Htag2>
          <GridContainer>
            {selectItems?.map((post: PostType) => {
              const imageTags: string[] = [];
              const parser = new Parser({
                onopentag(name, attribs) {
                  if (name === 'img' && attribs.src) {
                    imageTags.push(attribs.src);
                  }
                }
              });

              parser.write(post.body);
              parser.end();

              return (
                <Card>
                  {' '}
                  <div key={post.id}>
                    {imageTags.length > 0 ? <PostImg src={imageTags[0]} alt={`Image`} /> : <PostImg src={DefaultImg} />}
                    <HtagTttle>{post.store?.title}</HtagTttle>
                    <CardInfo>
                      <div>
                        <PtagDate>{format(new Date(post.created_at), 'yyyy-MM-dd')}</PtagDate>
                      </div>
                      <BtnBox>
                        <DetailBtn
                          onClick={() => {
                            PostDetail(post.id);
                          }}
                        >
                          상세보기
                        </DetailBtn>
                      </BtnBox>
                    </CardInfo>
                  </div>
                </Card>
              );
            })}
          </GridContainer>
        </ReviewWrapper>
      </Container>
      <div ref={ref}></div>
    </>
  );
};

export default YourPage;

const Container = styled.div`
  display: flex;

  max-width: 1920px;
  width: 50%;
  height: 100%;
  margin: 0 auto;

  margin-top: 50px;
  margin-bottom: 100px;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 250px;
  position: fixed; /* 화면에 고정 */
  /* top: 0; 상단에 고정 */
  overflow-y: auto;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;

  border: 3px solid #333333;
  border-radius: 18px;
`;

const Htag = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

const HtagLine = styled.h2`
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;
const BoxLine = styled.div`
  border-bottom: 2px dashed #333333;

  margin: 15px 10px 15px 10px;
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
`;

const Img = styled.img`
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 50%;
`;

const Ptag = styled.p`
  font-size: 15px;
  color: #333333;

  padding: 5px;
`;

const SpanLine = styled.span`
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const StoreListBox = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  background-color: var(--fourth-color);
  margin-top: 30px;

  border: 3px solid #333333;
  border-radius: 18px;

  height: 560px;
  /* height: 100%; */
  /* overflow: hidden; */
  overflow-y: scroll;

  padding: 5px;
`;

const BookMarkList = styled.div`
  margin-top: 24px;
  max-height: inherit;
`;

const BookMarkWraaper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookMarkBox = styled.div`
  display: flex;

  padding: 5px;
`;

const StoreList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoreInfo = styled.div`
  margin-bottom: 6px;
`;

const Location = styled.span`
  font-size: 10px;
`;

const StoreTitle = styled.span`
  font-size: 15px;
`;

const Line = styled.div`
  width: 86%;
  margin: 5px 15px;
  border-bottom: 1px dashed #333333;
`;

const ReviewWrapper = styled.div`
  margin: 50px 0 0 280px;
`;

const Htag2 = styled.h2`
  /* margin-top: 20px; */
  display: flex;
  align-items: flex-start;
`;

const GridContainer = styled.div`
  margin: 0 auto;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr); // 한 줄에 두 개의 열
  gap: 30px;

  /* max-width: 500px; // 그리드가 너무 넓어지는 것을 제한 */
  width: 50%;

  margin-top: 28px;
  /* margin-left: 160px; */
  /* margin-top: 50px; */
`;

const Card = styled.div`
  width: 260px !important ;

  height: 340px;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);

  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  position: relative;
`;

const PostImg = styled.img`
  border: 2px solid black;
  border-radius: 18px;
  object-fit: cover;

  width: 225px;
  height: 250px;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ceoter;

  width: 225px;
`;

const HtagTttle = styled.h3`
  /* padding: 5px; */
  margin-top: 10px;
  margin-left: 5px;
  font-size: 15px;
  width: 225px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PtagDate = styled.p`
  margin-top: 12px;
  /* padding: 5px; */
  margin-left: 5px;
  width: 100px;
  display: flex;
  justify-content: flex-start;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const DetailBtn = styled.button`
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 25px;

  font-size: 15px;

  background-color: var(--second-color);
`;
