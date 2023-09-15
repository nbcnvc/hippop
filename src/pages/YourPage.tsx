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
// zustand
import { useCurrentUser } from '../store/userStore';
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
import { Skeleton } from '@mui/material';
// alert
import { toast } from 'react-toastify';
// style
import { St } from './style/St.YourPage';

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

  const { state } = useLocation();
  const userId: string = state?.userId || '';

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

  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);

  if (isLoading || isUserLoading || isBookMarkLoading) {
    // 로딩 중일 때 스켈레톤 표시
    return (
      <>
        <St.Container>
          <St.UserWrapper>
            <St.UserBox>
              <St.Htag>
                <Skeleton width={24} height={24} /> {/* You can adjust the size */}
                {/* <HtagLine> */}
                <Skeleton width={100} height={24} /> {/* Adjust size */}
                {/* 님의 프로필 */}
                {/* </HtagLine> */}
              </St.Htag>
              <St.BoxLine></St.BoxLine>
              <St.UserProfile>
                <div>
                  <Skeleton variant="circular" width={70} height={70} /> {/* Circular skeleton */}
                </div>
                <div>
                  {/* <Ptag>힙팝메이트</Ptag> */}

                  <St.Ptag>
                    <St.SpanLine>
                      <Skeleton width={80} height={14} /> {/* Adjust size */}
                      <Skeleton width={80} height={14} /> {/* Adjust size */}
                    </St.SpanLine>
                    {/* 님 */}
                  </St.Ptag>
                </div>
              </St.UserProfile>
            </St.UserBox>
            <div></div>
            <St.StoreListBox>
              <St.Htag>
                <Skeleton width={160} height={24} /> {/* Adjust size */}
              </St.Htag>
              <St.BookMarkList>
                {Array.from({ length: 5 }).map((_, index) => (
                  <St.BookMarkWraaper key={index}>
                    <St.BookMarkBox>
                      <div>
                        <St.StoreList>
                          <p>
                            <Skeleton width={40} height={40} /> {/* Adjust size */}
                          </p>
                          <St.StoreInfo>
                            <div>
                              <St.Location>
                                <Skeleton width={100} height={12} /> {/* Adjust size */}
                              </St.Location>
                            </div>
                            <St.TitleBox>
                              <St.StoreTitle>
                                <Skeleton width={200} height={20} /> {/* Adjust size */}
                              </St.StoreTitle>
                            </St.TitleBox>
                          </St.StoreInfo>
                        </St.StoreList>
                      </div>
                    </St.BookMarkBox>
                    <St.Line></St.Line>
                  </St.BookMarkWraaper>
                ))}
              </St.BookMarkList>
            </St.StoreListBox>
          </St.UserWrapper>

          <St.ReviewWrapper>
            <St.Htag2>
              <Skeleton width={160} height={20} /> {/* Adjust size */}
            </St.Htag2>
            <St.GridContainer>
              {Array.from({ length: 5 }).map((_, index) => (
                <St.Card key={index}>
                  {' '}
                  <div>
                    {/* <PostImgBox> */}
                    {/* <Skeleton width="100%" height="100%" /> */}
                    <Skeleton width={340} height={310} />
                    {/* </PostImgBox> */}

                    <St.HtagTttle>
                      <Skeleton width={200} height={20} /> {/* Adjust size */}
                    </St.HtagTttle>
                    <St.CardInfo>
                      <div>
                        <St.PtagDate>
                          <Skeleton width={100} height={12} /> {/* Adjust size */}
                        </St.PtagDate>
                      </div>
                      <St.BtnBox>
                        <St.DetailBtn>
                          <Skeleton width={80} height={32} /> {/* Adjust size */}
                        </St.DetailBtn>
                      </St.BtnBox>
                    </St.CardInfo>
                  </div>
                </St.Card>
              ))}
            </St.GridContainer>
          </St.ReviewWrapper>
        </St.Container>
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
      <St.Container>
        <St.UserWrapper>
          <St.UserBox>
            <St.Htag>
              <HomeRoundedIcon />
              <St.HtagLine>{user?.name} </St.HtagLine>님의 프로필
            </St.Htag>
            <St.BoxLine></St.BoxLine>
            <St.UserProfile>
              <St.Between>
                {user?.avatar_url?.startsWith('profile/') ? (
                  <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user?.avatar_url}`} alt="User Avatar" />
                ) : (
                  <St.Img src={user?.avatar_url} alt="User Avatar" />
                )}
                <St.NameBox>
                  <St.Ptag>힙팝메이트</St.Ptag>
                  <St.Ptag>
                    <St.SpanLine>{user?.name}</St.SpanLine>님
                  </St.Ptag>
                </St.NameBox>
              </St.Between>
              <St.Between1>
                <Subscribe writerId={stateId} />
                {currentUser?.id !== user?.id && <St.MsgButton onClick={openMsgModal}>쪽지 보내기</St.MsgButton>}
              </St.Between1>
            </St.UserProfile>
          </St.UserBox>
          {/* <div></div> */}
          <St.StoreListBox>
            <div>
              <St.Htag>
                <St.HtagLine>북마크한 팝업스토어</St.HtagLine>
              </St.Htag>
              {bookMarkStore && bookMarkStore.length > 0 ? (
                <St.BookMarkList>
                  <div style={{ paddingRight: '1rem' }}>
                    {bookMarkStore?.map((bookMark) => {
                      return (
                        <St.BookMarkWraaper>
                          <St.BookMarkBox>
                            <div>
                              <St.StoreList>
                                <p>
                                  <RoomRoundedIcon fontSize="large" />
                                </p>
                                <St.StoreInfo>
                                  <St.Location>
                                    {bookMark.store?.location.split(' ').slice(0, 1)}{' '}
                                    {bookMark.store?.location.split(' ').slice(1, 2)}
                                  </St.Location>

                                  <St.TitleBox>
                                    <St.StoreTitle>{bookMark.store?.title}</St.StoreTitle>
                                  </St.TitleBox>

                                  <St.StoreDetailArrow
                                    onClick={() => {
                                      BookMarkDetail(bookMark.store.id);
                                    }}
                                  >
                                    <ArrowForwardIosIcon />
                                  </St.StoreDetailArrow>
                                </St.StoreInfo>
                              </St.StoreList>
                            </div>
                          </St.BookMarkBox>
                          <St.Line></St.Line>
                        </St.BookMarkWraaper>
                      );
                    })}
                  </div>
                </St.BookMarkList>
              ) : (
                <St.NoneBookMarkBox>
                  <St.NoneBookMark>{user?.name}님이 북마크한 팝업스토어가 없어요 :)</St.NoneBookMark>
                </St.NoneBookMarkBox>
              )}
            </div>
          </St.StoreListBox>
        </St.UserWrapper>

        <St.ReviewWrapper>
          <St.Htag2>
            <EditNoteRoundedIcon fontSize="large" />
            <St.HtagLine>작성한 게시글</St.HtagLine>
          </St.Htag2>
          {selectItems && selectItems.length > 0 ? (
            <>
              {userData && (
                <St.GridContainer>
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
                      <St.Card
                        onClick={() => {
                          PostDetail(post.id);
                        }}
                      >
                        <div key={post.id}>
                          {imageTags.length > 0 ? (
                            <St.PostImg src={imageTags[0]} alt={`Image`} />
                          ) : (
                            <St.PostImg src="/asset/defaultImg.png" />
                          )}
                          <St.HtagTttle>{post.store?.title}</St.HtagTttle>
                          <St.CardInfo>
                            <div>
                              <St.PtagDate>{format(new Date(post.created_at), 'yyyy-MM-dd')}</St.PtagDate>
                            </div>
                            <St.BtnBox>
                              <St.DetailBtn>상세보기</St.DetailBtn>
                            </St.BtnBox>
                          </St.CardInfo>
                        </div>
                      </St.Card>
                    );
                  })}
                </St.GridContainer>
              )}
            </>
          ) : (
            <St.H1TagDiv>
              <St.H1tagLine>작성한 글이 없습니다!</St.H1tagLine>
            </St.H1TagDiv>
          )}
        </St.ReviewWrapper>
      </St.Container>
      <div ref={ref}></div>
    </>
  );
};

export default YourPage;
