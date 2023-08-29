import React, { useState, useRef, useEffect, useMemo } from 'react';

// 라이브러리
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
//타입
import { Bookmark, FetchsStore, PostType, Store } from '../types/types';
//api
import { getProfileImg, getUser } from '../api/user';
import { getInfinityStore } from '../api/store';
import { supabase } from '../api/supabase';

import { setUserStore, useCurrentUser } from '../store/userStore';
import { randomFileName } from '../hooks/useHandleImageName';
//스타일
import { styled } from 'styled-components';
import PartyModeIcon from '@mui/icons-material/PartyMode';
//메세지
import SendBox from '../components/message/SendBox';
import MessageReply from '../components/message/MessageReply';
import { MessageType } from '../types/types';
import ReceiveBox from '../components/message/ReceiveBox';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // 쪽지 답장 모달
  const [replyModal, setReplyModal] = useState<boolean | null>(null);
  const [sendMsgUser, setSendMsgUser] = useState<MessageType | null>(null);
  //구독 목록 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [subscribers, setSubscribers] = useState<string[]>([]);

  const [fetchUserPost, setFetchUserPost] = useState<PostType[]>([]);
  const [fetchSubs, setFetchSubs] = useState<Bookmark[]>([]);
  const [extractedData, setExtractedData] = useState<Store[]>([]);
  // 게시글 & 북마크 토글
  const [activeSection, setActiveSection] = useState('myReview'); // Default to 'myReview'

  const [toggleMsgBox, setToggleMsgBox] = useState<string>('받은 쪽지함');
  const imageInputRef = useRef(null);

  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  const currentUser: any | null = useCurrentUser();
  // console.log('test ====> ', currentUser);
  const currentUserId = currentUser?.id;
  const { data: sublistData } = useQuery(['sublist'], () => getSubList(currentUserId ?? ''));
  // console.log('test ====> ', sublistData);

  const getSubList = async (userId: string) => {
    const { data } = await supabase.from('subscribe').select('subscribe_to').eq('subscribe_from', userId);
    return data;
  };
  //
  useEffect(() => {
    const loadSubscribers = async () => {
      if (sublistData) {
        const subscribeToValues = sublistData.map((item) => item.subscribe_to);
        const subscribeUserPromises = subscribeToValues.map(async (subscribe_to) => {
          const { data: subscribeUser } = await supabase.from('user').select('*').eq('id', subscribe_to);
          return subscribeUser;
        });
        const allSubscribeUsers = await Promise.all(subscribeUserPromises);

        const filteredSubscribers = allSubscribeUsers
          .filter((subscribeUserArray) => subscribeUserArray && subscribeUserArray.length > 0)
          .map((subscribeUserArray) => subscribeUserArray && subscribeUserArray[0].name);

        setSubscribers(filteredSubscribers as string[]);
      }
    };
    if (sublistData) {
      loadSubscribers();
    }
  }, [sublistData]);

  // 구독목록 visible
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 인피니티 스크롤을 위한 데이터 조회
  const {
    data: stores,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchsStore>({
    queryKey: [`/search11`],
    queryFn: ({ pageParam }) => getInfinityStore(pageParam),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
    }
  });

  // 인피니티 스크롤로 필터된 store
  const selectStores = useMemo(() => {
    return stores?.pages
      .map((data) => {
        return data.stores;
      })
      .flat();
  }, [stores]);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView: any) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // my page가 렌더되면 현재 login상태 user가 작성한 post 배열 가져오기
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (currentUser) {
        const userPostId = currentUser.id;
        let { data } = await supabase.from('post').select('*').eq('user_id', userPostId);
        // console.log(data);
        setFetchUserPost(data || []);
      }
    };
    fetchUserPosts();
  }, [currentUser]);
  //////////////////////////////////////
  useEffect(() => {
    const Subs = async () => {
      if (currentUser) {
        const userPostId = currentUser.id;
        let { data } = await supabase.from('bookmark').select('*').eq('user_id', userPostId);
        // console.log('1----', data);
        if (data) {
          setFetchSubs(data);
          const storeIds = data.map((bookmark) => bookmark.store_id);
          // console.log('2----', storeIds); // Array of store_ids
          if (storeIds.length > 0) {
            let { data: storeData } = await supabase.from('store').select('*').in('id', storeIds);
            // console.log('3----', storeData); // Array of store data
            if (storeData) {
              const extractedData: Store[] = storeData.map((store) => ({
                id: store.id,
                location: store.location,
                period_start: store.period_start,
                period_end: store.period_end,
                title: store.title,
                body: store.body,
                opening: store.opening,
                images: store.images,
                link: store.link
              }));
              // console.log('4----', extractedData);
              setExtractedData(extractedData);
            }
          }
        }
      }
    };

    Subs();
  }, [currentUser]);

  // 작성 날짜 잘라내기
  function formatDate(dateTimeString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);

    const [month, day, year] = formattedDate.split('/'); // 날짜를 월, 일, 년 순서로 분리
    return `${year}-${month}-${day}`; // 'YYYY-MM-DD' 형식으로 재조합하여 반환
    // return new Date(dateTimeString).toLocaleString('en-US', options); // 기본 년월일
  }

  function extractImageTags(html: string) {
    const imageTags = [];
    const pattern = /<img.*?src=["'](.*?)["'].*?>/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      imageTags.push(match[1]);
    }

    return imageTags;
  }

  // post.body에서 이미지 태그 추출
  const imageTags = fetchUserPost.map((post) => extractImageTags(post.body)).flat();

  // 닉네임 수정 handler
  const handleNameEdit = () => {
    setEditingName(true);
    setNewName(currentUser?.name || '');
  };
  // 닉네임 저장
  const handleNameSave = async () => {
    if (newName.length >= 5) {
      alert('닉네임은 다섯 글자 미만이어야 합니다.');
      return;
    }

    const { error } = await supabase.from('user').update({ name: newName }).eq('id', currentUser?.id);
    if (currentUser && !error) {
      const userData = await getUser(currentUser?.id);
      setCurrentUser(userData);
      setEditingName(false); // 수정 모드 해제
      alert('닉네임이 변경 됐습니다 :)');
    } else {
      console.log(error);
    }
  };
  // 수정 모드 해제
  const handleNameCancel = () => {
    setEditingName(false);
  };

  // 프로필 수정 handler
  const handleImageUpload = () => {
    setSelectedImage(null);
    setImageUploadVisible(!imageUploadVisible);
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      setImageUploadVisible(true);
    } else {
      setSelectedImage(null); // 이미지를 선택하지 않은 경우에 null로 설정
      setImageUploadVisible(false);
    }
  };

  // 프로필 선택후 저장하기
  const handleImageConfirm = async () => {
    if (selectedImage) {
      try {
        const newFileName = randomFileName(selectedImage.name);
        const renamedFile = new File([selectedImage], newFileName);

        const { data } = await supabase.storage.from('images').upload(`profile/${renamedFile.name}`, renamedFile);

        if (data) {
          const imgUrl = data.path;

          await supabase.from('user').update({ avatar_url: imgUrl }).eq('id', currentUser?.id);

          // Fetch updated user data using getUser
          if (currentUser) {
            const userData = await getUser(currentUser?.id);
            setCurrentUser(userData);
            // console.log('userData', userData);
          }

          alert('프로필 변경이 완료됐습니다 :)');
          setImageUploadVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  /////////////// 무한스크롤 슬라이스
  const sliceStore = fetchUserPost?.slice(0, 10);
  const ClickToggleBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setToggleMsgBox(name);
  };
  ////////////
  const handleSectionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const section = button.getAttribute('data-section');

    if (section !== null) {
      setActiveSection(section);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <MypageTag>
      <header>
        <div className="info-wrapper">
          {currentUser?.avatar_url && (
            <div className="avatar-container">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)} // 선택한 이미지 파일을 미리보기로 보여줌
                  alt="Selected Image"
                  width={120}
                  height={120}
                />
              ) : (
                <div className="avatar">
                  {currentUser.avatar_url.startsWith('profile/') ? (
                    <img
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser.avatar_url}`}
                      alt="User Avatar"
                    />
                  ) : (
                    <img src={currentUser.avatar_url} alt="User Avatar" />
                  )}
                </div>
              )}
              <div className="circle-bg">
                <PartyModeIcon className="party-icon" onClick={handleImageUpload} />
              </div>
              {imageUploadVisible && (
                <div className="img-uploader">
                  <input type="file" ref={imageInputRef} onChange={handleImageInputChange} />
                  <button className="confirm" onClick={handleImageConfirm}>
                    저장
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="info-inner">
            <p>
              Welcome,&nbsp;&nbsp;
              {editingName ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: '20%' }}
                />
              ) : (
                currentUser?.name
              )}
              님의 My Page
            </p>
            <span>
              <div className="user-sub-info">
                {currentUser?.email}
                {sublistData && (
                  <h5 onClick={handleMenuToggle} ref={menuRef}>
                    &nbsp;구독한 사람: {subscribers.length}
                  </h5>
                )}
                <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                  {/* <Link to="/mypage">My Page</Link> */}
                  <ul>
                    {subscribers
                      .slice() // 복사본 생성
                      .sort() // 알파벳 순으로 정렬
                      .map((subscriber, index) => (
                        <li key={index}>{subscriber}</li>
                      ))}
                  </ul>
                </div>
              </div>
              <div>
                {editingName ? (
                  <>
                    <button onClick={handleNameSave}>저장</button>
                    <button onClick={handleNameCancel}>취소</button>
                  </>
                ) : (
                  <button onClick={handleNameEdit}>수정</button>
                )}
              </div>
            </span>
          </div>
        </div>
        <div>
          <button name="받은 쪽지함" onClick={ClickToggleBox}>
            받은 쪽지함
          </button>
          <button name="보낸 쪽지함" onClick={ClickToggleBox}>
            보낸 쪽지함
          </button>
          <div className="alram-wrapper">
            {toggleMsgBox === '받은 쪽지함' ? (
              <ReceiveBox toggleMsgBox={toggleMsgBox} setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
            ) : (
              <SendBox toggleMsgBox={toggleMsgBox} setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
            )}
          </div>
          {/* <img src="/asset/myPage.png" alt="test image" /> */}
          {replyModal && <MessageReply sendMsgUser={sendMsgUser} setOpenReply={setReplyModal} />}
        </div>
      </header>
      <div>
        <button data-section="myReview" onClick={handleSectionChange}>
          나의 게시글
        </button>
        <button data-section="myBookmark" onClick={handleSectionChange}>
          나의 북마크
        </button>
        {activeSection === 'myReview' && (
          <div>
            <h3>My Review</h3>
            <div className="post-wrapper">
              {sliceStore.map((post) => {
                const imageTags = extractImageTags(post.body);
                return (
                  <div key={post.id}>
                    {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
                    {imageTags.length > 0 ? (
                      <div>
                        {imageTags.map((src, index) => (
                          <img key={index} src={src} alt={`Image ${index}`} width={250} />
                        ))}
                      </div>
                    ) : (
                      <div>
                        <img src="/asset/kakao.png" alt="Default Image" width={250} />
                      </div>
                    )}
                    <h2>{post.title}</h2>
                    <p>{formatDate(post.created_at)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'myBookmark' && (
          <div>
            <h2>My Boomark</h2>
            <div className="subs-wrapper">
              {extractedData.map((store) => (
                <div key={store.id} className="user-subs">
                  <img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`}
                    alt={`Store Image`}
                    width={200}
                  />
                  <h2>{store.title}</h2>
                  {/* <a href={store.link}>Link</a> */}
                  <p>
                    {store.period_start} ~ {store.period_end}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
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
    </MypageTag>
  );
};

export default MyPage;
const MypageTag = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  margin-top: 1rem;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-container {
      position: relative;
      width: 25%;
      .circle-bg {
        background-color: white;
      }
      img {
        margin: 0;
        padding: 0;
        margin-left: 0;
        max-width: 100%;
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 10px;
      }
      .img-uploader {
        width: 225px;
        position: absolute;
        display: flex;
        .confirm {
          width: 60px;
        }
        .user-sub-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          h5 {
            margin-top: 6px;
            font-size: 10px;
          }
        }
      }
    }
    .dropdown-content {
      position: relative;
      ul {
        position: absolute;
        width: 100px;
        background: white;
        left: -104px;
        top: 20px;
        border-radius: 8px;
      }
      li {
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
          border-radius: 8px;
          background-color: #f1f1f1;
        }
      }
    }
    .avatar-container .party-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-bottom: 5px;
      // margin-right: 5px;
      color: #f24d0d; //rgb(103, 243, 201);
      background-color: white;
      padding: 4px;
      border-radius: 50%;
      transition: color 0.3s ease, transform 0.3s ease;
      cursor: pointer;
    }
    .party-icon:hover {
      color: gray;
    }
    .party-icon:active {
      transform: scale(0.9);
    }
    .info-wrapper {
      width: 50%;
      border: 1px dotted gray;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .info-inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
        margin-left: 10px;
        p {
          font-size: 1.2rem;
          text-align: left;
        }
        span {
          text-align: left;
          margin: 10px 0 0;
          color: gray;
          display: flex;
          justify-content: space-between;
          .user-sub-info {
            display: flex;
          }
        }
      }
    }
    .alram-wrapper {
      width: 520px;
      height: 200px;
      border: 1px dotted gray;
      display: flex;
      justify-content: flex-end;
      button {
        width: 120px;
        height: 22px;
      }
      li {
        text-align: center;
        padding: 2px 20px;
        margin: 4px 0;
        background-color: gray;
        border-radius: 4px;
      }
    }
  }
  .post-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 한 줄에 두 개의 열 */
    gap: 20px; /* 열 사이의 간격 조정 */
    max-width: 900px; /* 그리드가 너무 넓어지는 것을 제한 */
    margin: 0 auto; /* 가운데 정렬 */
  }
  .subs-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
  }
`;
