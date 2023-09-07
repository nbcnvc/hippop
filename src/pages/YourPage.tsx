import React, { useState, useEffect, useMemo } from 'react';

// 컴포넌트
import Subscribe from '../components/community/detail/Subscribe';
import Message from '../components/message/Message';
// 라이브러리
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { Parser } from 'htmlparser2'; // 문서를 분석해주는 (div, p tag) 라이브러리
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
// api
import { getProfileImg, getUser } from '../api/user'; // 사용자 정보를 가져오는 함수
import { getYourItems } from '../api/post'; // 게시글 가져오는 함수
import { fetchBookMarkStore } from '../api/bookmark';
// 타입
import { UserInfo, PostType } from '../types/types';
// mui
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

// img
import DefaultImg from '../images/defaultImg.png';
import { Skeleton } from '@mui/material';

import { useCurrentUser } from '../store/userStore';
import { toast } from 'react-toastify';

const YourPage = () => {
  // 현재 유저
  const currentUser = useCurrentUser();
  // 쪽지 보내기
  const [msgModal, setMsgModal] = useState<boolean>(false);
  const [stateId, setStateId] = useState<string>('');

  const openMsgModal = () => {
    if (!currentUser) {
      toast.info('로그인을 해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    setMsgModal(true);
  };

  // const { id } = useParams();

  const { state } = useLocation();
  const userId: string = state?.userId || '';

  // const userId: string = id as string;
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [activeSection, setActiveSection] = useState('myReview'); // 기본값 설정
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery(['user', stateId], () => getUser(stateId));

  const {
    data: bookMarkStore,
    isLoading: isBookMarkLoading,
    isError: isBookMarkError
  } = useQuery(['BookMarkStore', stateId], () => fetchBookMarkStore(stateId));

  const handleSectionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const section = button.getAttribute('data-section');

    if (section !== null) {
      setActiveSection(section);
    }
  };

  // userId가 state로 최초에 들어오면 토큰을 생성하고
  // 생성한 토큰을 setStateId 담아줌
  useEffect(() => {
    if (user || userId) {
      localStorage.setItem('YourToken', userId);
    }

    setStateId(localStorage.getItem('YourToken') ?? '');
  }, []);

  // stateId를 가지고 getUser => user가 들어오면 setUserData해주기
  useEffect(() => {
    setUserData(user || null); // Use null as a fallback when user is undefined
  }, [user]);

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
    queryKey: ['yourpage', stateId, activeSection],
    queryFn: ({ pageParam }) => getYourSectionItems({ pageParam, activeSection, userId: stateId }),
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
    }
  };

  const PostDetail = (postId: number) => {
    navigate(`/rdetail/${postId}`);
  };
  const BookMarkDetail = (storeId: number) => {
    navigate(`/detail/${storeId}`);
  };

  useEffect(() => {
    if (userData) {
      fetchProfileImage();
    }
  }, [userData]);

  if (isLoading || isUserLoading || isBookMarkLoading) {
    // 로딩 중일 때 스켈레톤 표시
    return (
      <>
        <Container>
          <UserWrapper>
            <UserBox>
              <Htag>
                <Skeleton width={24} height={24} /> {/* You can adjust the size */}
                {/* <HtagLine> */}
                <Skeleton width={100} height={24} /> {/* Adjust size */}
                {/* 님의 프로필 */}
                {/* </HtagLine> */}
              </Htag>
              <BoxLine></BoxLine>
              <UserProfile>
                <div>
                  <Skeleton variant="circular" width={70} height={70} /> {/* Circular skeleton */}
                </div>
                <div>
                  {/* <Ptag>힙팝메이트</Ptag> */}

                  <Ptag>
                    <SpanLine>
                      <Skeleton width={80} height={14} /> {/* Adjust size */}
                      <Skeleton width={80} height={14} /> {/* Adjust size */}
                    </SpanLine>
                    {/* 님 */}
                  </Ptag>
                </div>
              </UserProfile>
            </UserBox>
            <div></div>
            <StoreListBox>
              <Htag>
                <Skeleton width={160} height={24} /> {/* Adjust size */}
              </Htag>
              <BookMarkList>
                {Array.from({ length: 5 }).map((_, index) => (
                  <BookMarkWraaper key={index}>
                    <BookMarkBox>
                      <div>
                        <StoreList>
                          <p>
                            <Skeleton width={40} height={40} /> {/* Adjust size */}
                          </p>
                          <StoreInfo>
                            <div>
                              <Location>
                                <Skeleton width={100} height={12} /> {/* Adjust size */}
                              </Location>
                            </div>
                            <TitleBox>
                              <StoreTitle>
                                <Skeleton width={200} height={20} /> {/* Adjust size */}
                              </StoreTitle>
                            </TitleBox>
                          </StoreInfo>
                        </StoreList>
                      </div>
                    </BookMarkBox>
                    <Line></Line>
                  </BookMarkWraaper>
                ))}
              </BookMarkList>
            </StoreListBox>
          </UserWrapper>

          <ReviewWrapper>
            <Htag2>
              <Skeleton width={160} height={20} /> {/* Adjust size */}
            </Htag2>
            <GridContainer>
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index}>
                  {' '}
                  <div>
                    {/* <PostImgBox> */}
                    {/* <Skeleton width="100%" height="100%" /> */}
                    <Skeleton width={340} height={310} />
                    {/* </PostImgBox> */}

                    <HtagTttle>
                      <Skeleton width={200} height={20} /> {/* Adjust size */}
                    </HtagTttle>
                    <CardInfo>
                      <div>
                        <PtagDate>
                          <Skeleton width={100} height={12} /> {/* Adjust size */}
                        </PtagDate>
                      </div>
                      <BtnBox>
                        <DetailBtn>
                          <Skeleton width={80} height={32} /> {/* Adjust size */}
                        </DetailBtn>
                      </BtnBox>
                    </CardInfo>
                  </div>
                </Card>
              ))}
            </GridContainer>
          </ReviewWrapper>
        </Container>
        <div ref={ref}></div>
      </>
    );
  }

  if (isError || isUserError || isBookMarkError) {
    return <div>Error occurred while fetching user data.</div>;
  }

  return (
    <>
      {msgModal && <Message msgModal={msgModal} setMsgModal={setMsgModal} writer={user!} />}
      <Container>
        <UserWrapper>
          <UserBox>
            <Htag>
              <HomeRoundedIcon />
              <HtagLine>{user?.name} </HtagLine>님의 프로필
            </Htag>
            <BoxLine></BoxLine>
            <UserProfile>
              <Between>
                {user?.avatar_url?.startsWith('profile/') ? (
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user?.avatar_url}`} alt="User Avatar" />
                ) : (
                  <Img src={user?.avatar_url} alt="User Avatar" />
                )}
                <NameBox>
                  <Ptag>힙팝메이트</Ptag>
                  <Ptag>
                    <SpanLine>{user?.name}</SpanLine>님
                  </Ptag>
                </NameBox>
              </Between>
              <Between1>
                <Subscribe writerId={user?.id} />
                {currentUser?.id !== user?.id && <MsgButton onClick={openMsgModal}>쪽지 보내기</MsgButton>}
              </Between1>
            </UserProfile>
          </UserBox>
          {/* <div></div> */}
          <StoreListBox>
            <div>
              <Htag>
                <HtagLine>북마크한 팝업스토어</HtagLine>
              </Htag>
              <BookMarkList>
                <div style={{ paddingRight: '1rem' }}>
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
                                <Location>
                                  {bookMark.store?.location.split(' ').slice(0, 1)}{' '}
                                  {bookMark.store?.location.split(' ').slice(1, 2)}
                                </Location>

                                <TitleBox>
                                  <StoreTitle>{bookMark.store?.title}</StoreTitle>
                                </TitleBox>

                                <StoreDetailArrow
                                  onClick={() => {
                                    BookMarkDetail(bookMark.store.id);
                                  }}
                                >
                                  <ArrowForwardIosIcon />
                                </StoreDetailArrow>
                              </StoreInfo>
                            </StoreList>
                          </div>
                        </BookMarkBox>
                        <Line></Line>
                      </BookMarkWraaper>
                    );
                  })}
                </div>
              </BookMarkList>
            </div>
          </StoreListBox>
        </UserWrapper>

        <ReviewWrapper>
          <Htag2>
            <EditNoteRoundedIcon fontSize="large" />
            <HtagLine>작성한 게시글</HtagLine>
          </Htag2>
          {userData && (
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
                    <div key={post.id}>
                      {imageTags.length > 0 ? (
                        <PostImg src={imageTags[0]} alt={`Image`} />
                      ) : (
                        <PostImg src={DefaultImg} />
                      )}
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
          )}
        </ReviewWrapper>
      </Container>
      <div ref={ref}></div>
    </>
  );
};

export default YourPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  min-width: 744px;
  width: 50%;
  height: 100%;
  margin: 0 auto;

  margin-top: 120px;
  margin-bottom: 100px;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  overflow-y: auto;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 220px;
  width: 30%;
  height: 250px;
  padding: 5px;

  border: 3px solid #333333;
  border-radius: 18px;
  margin-right: 30px;
`;

const Htag = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;

  font-size: 22px;
`;

const HtagLine = styled.h2`
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  display: flex;
  align-items: center;

  margin-left: 5px;
`;

const BoxLine = styled.div`
  border-bottom: 2px dashed #333333;

  margin: 15px 10px 5px 10px;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 0;
`;

const Between1 = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 0;

  width: 200px;
  font-size: 12px;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Ptag = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #333333;

  padding: 5px;

  margin-left: 15px;
`;

const SpanLine = styled.span`
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const MsgButton = styled.button`
  width: 120px;
  height: 40px;
  margin-left: 10px;
  font-weight: 600;
  font-size: 15px;
`;

const StoreListBox = styled.div`
  background-color: var(--fourth-color);

  min-width: 330px;
  border: 3px solid #333333;
  border-radius: 18px;
  width: 100%;
  height: 250px;
  /* height: 100%; */
  /* overflow: hidden; */
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const BookMarkList = styled.div`
  margin-top: 24px;
  /* max-height: inherit; */
`;

const BookMarkWraaper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookMarkBox = styled.div`
  /* display: flex; */

  padding: 5px;
`;

const StoreList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin-left: 10px;
`;

const StoreInfo = styled.div`
  margin-bottom: 6px;

  display: flex;
  justify-content: space-between;

  align-items: center;
  width: 100%;
`;

const Location = styled.span`
  font-size: 17px;
  /* width: 30%; */
  flex: 0.8;
  margin-left: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  flex: 3;
  justify-content: flex-start;
  /* overflow-x: hidden; */
  white-space: nowrap;
  overflow: hidden;
  margin-left: 20px;
  /* width: 100%; */
`;

const StoreTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
  /* width: 100%; */
`;

const StoreDetailArrow = styled.div`
  cursor: pointer;
`;

const Line = styled.div`
  width: 99%;
  margin: 5px 15px;
  border-bottom: 1px dashed #333333;
`;

const ReviewWrapper = styled.div`
  margin: 50px 0 0 0;
`;

const Htag2 = styled.h2`
  margin-bottom: 55px;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  font-size: 25px;
`;

const GridContainer = styled.div`
  margin: 0 auto;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr); // 한 줄에 두 개의 열
  gap: 30px;

  width: 100%;

  margin-top: 28px;
  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr); // Three columns per row
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr); // Three columns per row
  }
`;

const Card = styled.div`
  width: 100%;
  /* height: 460px; */
  border-radius: 18px;
  border: 3px solid var(--fifth-color);

  padding: 10px;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  position: relative;

  box-sizing: border-box;

  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    border: 6px solid var(--primary-color);
  }
  &:active {
    background-color: rgb(215, 215, 219);
    transform: scale(0.98);
  }
`;

// const PostImgBox = styled.div`
//   border: 2px solid black;
//   border-radius: 18px;
//   object-fit: cover;

//   width: ;
//   height: 310px;
//   /* margin-bottom: 15px; */
// `;

const PostImg = styled.img`
  border: 2px solid black;
  border-radius: 18px;
  object-fit: cover;

  width: 365px;
  height: 310px;
  margin-bottom: 15px;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ceoter;

  width: 100%;
`;

const HtagTttle = styled.h3`
  margin-top: 10px;
  margin-left: 5px;
  margin: 10px 0 5px 5px;
  font-size: 20px;
  /* width: 225px; */

  white-space: nowrap;
  overflow: hidden;
  width: 90%;
`;

const PtagDate = styled.p`
  margin-top: 12px;
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
  /* width: 100px; */
  height: 35px;

  font-size: 15px;

  background-color: var(--second-color);
`;
