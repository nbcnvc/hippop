import React, { useState, useRef, useEffect, useMemo } from 'react';

// 라이브러리
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
//타입
import { Bookmark, PostType, Store } from '../types/types';
//api
import { getUser } from '../api/user';
import { getMyItems } from '../api/post';
import { getMyStores } from '../api/store';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import MyReview from '../components/mypage/MyReview';
import MyBookmark from '../components/mypage/MyBookmark';

const MyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: currentUser } = useQuery(['user', id], () => getUser(id ?? ''));
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // 쪽지 답장 모달
  const [replyModal, setReplyModal] = useState<boolean | null>(null);
  const [sendMsgUser, setSendMsgUser] = useState<MessageType | null>(null);
  //구독 목록 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [subscribers, setSubscribers] = useState<string[]>([]);

  const [fetchUserPost, setFetchUserPost] = useState<PostType[]>([]);
  const [fetchSubs, setFetchSubs] = useState<Bookmark[]>([]);
  const [extractedData, setExtractedData] = useState<Store[]>([]);
  // 게시글 & 북마크 토글
  const [activeSection, setActiveSection] = useState('myReview');

  const [toggleMsgBox, setToggleMsgBox] = useState<string>('받은 쪽지함');
  const imageInputRef = useRef(null);

  // 무한스크롤상태
  const initialPosts: any = [];

  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  // const currentUser: any | null = useCurrentUser();
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
  const getMySectionItems = ({
    pageParam,
    activeSection,
    userId
  }: {
    pageParam: number;
    activeSection: string;
    userId: string;
  }) => {
    if (activeSection === 'myReview') {
      return getMyItems(userId, 'posts', pageParam);
    } else if (activeSection === 'myBookmark') {
      return getMyStores(userId, pageParam);
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
    queryKey: ['mypage', currentUser?.id, activeSection],
    queryFn: ({ pageParam }) => getMySectionItems({ pageParam, activeSection, userId: currentUser?.id ?? '' }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return null;
    }
  });

  // 인피니티 스크롤로 필터된 post
  const selectItems = useMemo(() => {
    return items?.pages
      .map((data) => {
        return data.items;
      })
      .flat();
  }, [items]);

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
      const userData = await getUser(currentUser?.id ?? '');
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
            const userData = await getUser(currentUser?.id ?? '');
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
  const handleSectionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const section = button.getAttribute('data-section');

    if (section !== null) {
      setActiveSection(section);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const ClickToggleBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setToggleMsgBox(name);
  };

  return (
    <MypageTag>
      <header>
        {/* user Info tab */}
        <div className="info-wrapper">
          <div className="info-main">
            <div className="info-inner">
              <p>
                Welcome,
                <br />
                <span>
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
                </span>
              </p>
              <span>
                <div className="user-sub-info">{currentUser?.email}</div>
              </span>
            </div>
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
          </div>
          <div className="btn-mother">
            {sublistData && (
              <button onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}>
                구독한 유저 {subscribers.length}
              </button>
            )}
            {isMenuOpen && (
              <ul>
                {sublistData?.map((subscriberData, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/yourpage/${subscriberData.subscribe_to}`);
                    }}
                  >
                    {subscribers}
                  </li>
                ))}
              </ul>
            )}
            {editingName ? (
              <>
                <button onClick={handleNameSave}>저장</button>
                <button onClick={handleNameCancel}>취소</button>
              </>
            ) : (
              currentUser?.id === id && <button onClick={handleNameEdit}>수정</button>
            )}
          </div>
        </div>
        {/* message tab */}
        <div className="alram-mother">
          <div className="btn-wrapper">
            <button name="받은 쪽지함" onClick={ClickToggleBox}>
              받은 쪽지함
            </button>
            <button className="send-btn" name="보낸 쪽지함" onClick={ClickToggleBox}>
              보낸 쪽지함
            </button>
          </div>
          <div className="alram-wrapper">
            {toggleMsgBox === '받은 쪽지함' ? (
              <ReceiveBox toggleMsgBox={toggleMsgBox} setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
            ) : (
              <SendBox toggleMsgBox={toggleMsgBox} setSendMsgUser={setSendMsgUser} setReplyModal={setReplyModal} />
            )}
          </div>
          {replyModal && <MessageReply sendMsgUser={sendMsgUser} setOpenReply={setReplyModal} />}
        </div>
      </header>
      {/* Toggle tab */}
      <div className="toggle-wrapper">
        <h3>
          {activeSection === 'myReview' ? (
            <p>
              <span>내가 찜한</span> 팝업스토어 :D
            </p>
          ) : (
            <p>
              <span>나만의</span> 북마크-리스트 :)
            </p>
          )}
        </h3>
        <div className="btns-wrapper">
          <button
            data-section="myReview"
            onClick={handleSectionChange}
            className={activeSection === 'myReview' ? 'active' : ''}
          >
            나의 게시글
          </button>
          <button
            data-section="myBookmark"
            onClick={handleSectionChange}
            className={activeSection === 'myBookmark' ? 'active' : ''}
          >
            나의 북마크
          </button>
        </div>
        {/* Review tab */}
        {activeSection === 'myReview' && <MyReview selectItems={selectItems || []} />}
        {/* Bookmark tab */}
        {activeSection === 'myBookmark' && <MyBookmark items={items} />}
        {/* {activeSection === 'myBookmark' && (
          <div>
            <h2>My Bookmark</h2>
            <div className="subs-wrapper">
              {items?.pages.map((page) => (
                <React.Fragment key={page.page}>
                  {page.stores.slice(0, 3).map((store: Store) => (
                    <Link to={`/detail/${store.id}`} key={store.id} className="user-subs">
                      <img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`}
                        alt={`Store Image`}
                        width={200}
                      />
                      <h2>{store.title}</h2>
                      <p>
                        {store.period_start} ~ {store.period_end}
                      </p>
                    </Link>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )} */}
        <div
          style={{
            backgroundColor: 'transparent',
            width: '90%',
            border: 'none',
            padding: '20px',
            margin: '10px'
          }}
          ref={ref}
        />
      </div>
    </MypageTag>
  );
};

export default MyPage;
const MypageTag = styled.div`
  max-width: 1920px;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 10rem;
  width: 50%;
  header {
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .avatar-container {
      position: relative;
      margin: 0 auto;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;
      .circle-bg {
        background-color: white;
      }
      img {
        margin: 0;
        padding: 0;
        margin-left: 0;
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
      }
      .img-uploader {
        width: 250px;
        position: absolute;
        display: flex;
      }
        .confirm {
          position: absolute;
          left: 85px;
          top: 60px;
          padding: 0 0;
        }
        button {
          border-radius: 12px;
          width: 80px;
        }
        .user-sub-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .btn-wrapper {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
      }
    }
    ul {
      position: absolute;
      width: 100px;
      background: white;
      margin-left: -78px;
      top: 60px;
      border-radius: 8px;
      box-shadow: 4px 4px 10px rgb(87, 87, 87);
    }
    li {
      padding: 5px 10px;
      &:hover {
        border-radius: 8px;
        background-color: var(--sixth-color);
      }
    }
    h5 {
      margin-top: 4px;
      font-size: 12px;
      cursor: pointer;
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
      color: var(--primary-color);
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
      width: 25%;
      height: 300px;
      padding: 10px 20px;
      border: 3px solid var(--fifth-color);
      border-radius: 18px;
      background-color: white;
      .info-main {
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        // justify-content: flex-start;
        align-items: flex-end;
      }
      .info-inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          color: gray;
          span{
            color: var(--primary-color);
          font-size: 20px !important;
          }
        }
        span {
          font-size: 16px;
          text-align: left;
          margin: 10px 0 0;
          color: gray;
          display: flex;
          justify-content: center;
          align-items: center;
          .user-sub-info {
            display: flex;
          }
        }
        input {
          width:60px !important;
          height: 16px;
          border: 2px solid var(--primary-color);
          border-radius: 6px;
        }
      }
      .btn-mother {
        margin: 0 auto;
        padding: 0;
        width: 210px;
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        position: relative;

        button {
          border-radius: 22px;
          padding: 12px 20px;
        }
        button:first-child {
          margin-right: 10px;
        }
        button:last-child {
          font-weight: 600;
          background-color: var(--sixth-color);
          color: var(--fifth-color);
        }
      }
    }
    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .alram-mother {
      padding: 10px 20px;
      border: 3px solid var(--fifth-color);
      border-radius: 18px;
      background-color: white;
      width: 65%;
      height: 300px;

      .alram-wrapper {
        width: 100%;
        height: 240px;
        margin-top: 14px;
        // border: 1px dotted gray;
        display: flex;
        justify-content: flex-end;
        button {
          width: 120px;
          height: 22px;
        }
        li {
          width: 100%;
          text-align: center;
          padding: 2px 20px;
          margin: 4px 0;
          background-color: gray;
          border-radius: 4px;
        }
      }
    }
  }
  .toggle-wrapper button {
    background-color: white; /* 비활성 버튼 배경색 */
    color: var(--fifth-color);
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;
    margin-right: 10px;
  }
  .btns-wrapper {
    width: 100%;
  }
  button.active {
    background-color: var(--primary-color);
    color: white;
  }
  h3 {
    text-align: center !important;
    margin: 6rem 0 4rem !important;
    font-size: 28px !important;

    p {
      span {
        padding: 2px;
        background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
      }
    }
  }
  .send-btn {
    margin-left: 10px;
    background-color: var(--sixth-color);
    color: var(--fifth-color);
    font-weight: 600;
  }
  .post-wrapper {
    margin: 0 auto;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    max-width: 1920px;
    width: 99%;
    margin-top: 50px;

    .fid {
      margin: 0 auto;
      width: 100%;
      height: 500px;
      border-radius: 18px;
      border: 3px solid var(--fifth-color);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      transition: color 0.3s ease, transform 0.3s ease;
      &:hover {
        border: 6px solid var(--primary-color);
      }
      &:active {
        background-color: rgb(179, 179, 190);
        transform: scale(0.98);
      }
      img {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        width: 90%;
        height: 370px;
        object-fit: cover;
        border-radius: 10px;
        border: 3px solid var(--fifth-color);
      }
      .info-box {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 20px;
        &:first-child {
          width: 80%;
        }
        h2 {
          height: 16px;
          overflow: hidden;
        }
        button {
          width: 130px;
          padding: 10px 14px;
          background-color: var(--second-color);
          color: white;
          margin-right: 0;
        }
      }
    }
  }
  .fids {
    margin: 0 auto;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    max-width: 1920px;
    width: 99%;
    margin-top: 50px;

    .user-subs {
      margin: 0 auto;
      width: 100%;
      height: 500px;
      border-radius: 18px;
      border: 3px solid var(--fifth-color);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      transition: color 0.3s ease, transform 0.3s ease;
      &:hover {
        border: 6px solid var(--primary-color);
      }
      &:active {
        background-color: rgb(179, 179, 190);
        transform: scale(0.98);
      }
      img {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        width: 90%;
        height: 370px;
        object-fit: cover;
        border-radius: 10px;
        border: 3px solid var(--fifth-color);
      }
      .info-box {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 20px;
        &:first-child {
          width: 80%;
        }
        h2 {
          height: 16px;
          overflow: hidden;
        }
        button {
          width: 130px;
          padding: 10px 14px;
          background-color: var(--second-color);
          color: white;
          margin-right: 0;
        }
      }
    }
  }
`;
