import React, { useState, useRef, useEffect, useMemo } from 'react';

// 라이브러리
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
//타입
import { Bookmark, FetchsStore, Post, Store } from '../types/types';
//api
import { getProfileImg, getUser } from '../api/user';
import { fetchDetailData, getInfinityStore } from '../api/store';
import { supabase } from '../api/supabase';

import { setUserStore, useCurrentUser } from '../store/userStore';
import { randomFileName } from '../hooks/useHandleImageName';
//스타일
import { styled } from 'styled-components';
import PartyModeIcon from '@mui/icons-material/PartyMode';

const MyPage = () => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [fetchUserPost, setFetchUserPost] = useState<Post[]>([]);
  const [fetchSubs, setFetchSubs] = useState<Bookmark[]>([]);
  const [extractedData, setExtractedData] = useState<Store[]>([]);

  const imageInputRef = useRef(null);

  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  // 현재유저 정보 가져오기
  const currentUser: any | null = useCurrentUser();
  // console.log('test ====> ', currentUser);

  // 인피니티 스크롤을 위한 데이터 조회
  const {
    data: stores,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchsStore>({
    queryKey: [`/search`],
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
              setExtractedData(extractedData); // extractedData 설정
            }
          }
        }
      }
    };

    Subs();
  }, [currentUser]);

  // 작성 날짜 잘라내기
  function formatDate(dateTimeString: any) {
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

  function extractImageTags(html: any) {
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
  const { data }: any = useQuery(['profileImg', currentUser?.id], () => getProfileImg(currentUser?.id));

  const imgUrl = data?.avatar_url;

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

  const sliceStore = fetchUserPost?.slice(0, 3);
  return (
    <MypageTag>
      <header>
        {/* <button onClick={test}>test</button> */}
        <div className="info-wrapper">
          {currentUser?.avatar_url && (
            <div className="avatar-container">
              {currentUser.avatar_url.startsWith('profile/') ? (
                <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser.avatar_url}`} alt="User Avatar" />
              ) : (
                <img src={currentUser.avatar_url} alt="User Avatar" />
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
              Welcome,
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
              {currentUser?.email}
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
        <div className="alram-wrapper">
          <ul>
            <li>Alram #1</li>
            <li>Alram #2</li>
            <li>Alram #3</li>
            <li>Alram #4</li>
          </ul>
        </div>
      </header>
      <div>
        <h3>My posts</h3>
        <div className="post-wrapper">
          {sliceStore.map((post) => {
            const imageTags = extractImageTags(post.body);
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{formatDate(post.created_at)}</p>
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
              </div>
            );
          })}
        </div>
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
        <h2>My Subscribes</h2>
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
      {/* <img src="/asset/myPage.png" alt="test image" /> */}
    </MypageTag>
  );
};

export default MyPage;

const MypageTag = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  
  margin-top: 1rem;
  header{

    display: flex;
    justify-content: space-between;
    align-items: center;
  .avatar-container {
    position: relative;
    width: 25%;
    .circle-bg{
      background-color:white;
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
      display:flex;

      input{
        width:50px:
      }
      .confirm {
        width:60px;
      }
    }
  }

  .avatar-container
  .party-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 5px;
    // margin-right: 5px;
    color: #f24d0d; //rgb(103, 243, 201);
    background-color:white;
    padding:4px;
    border-radius:50%;
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

        // .party-icon {
        //   margin-left: auto;
        //   align-self: flex-end;
        //   color: #ffd700; 
        // }
      }
    }
  }

  .alram-wrapper {
    width: 50%;
    border: 1px dotted gray;
    display: flex;
    justify-content: flex-end;

    li {
      text-align: center;
      padding: 2px 20px;
      margin: 4px 0;
      background-color: gray;
      border-radius: 4px;
    }}
  }
  .post-wrapper{
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 한 줄에 두 개의 열 */
    gap: 20px; /* 열 사이의 간격 조정 */
    max-width: 900px; /* 그리드가 너무 넓어지는 것을 제한 */
    margin: 0 auto; /* 가운데 정렬 */
  }
  .subs-wrapper{
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 한 줄에 두 개의 열 */
    gap: 20px; /* 열 사이의 간격 조정 */
    max-width: 900px; /* 그리드가 너무 넓어지는 것을 제한 */
    margin: 0 auto; /* 가운데 정렬 */
  }
  // img {
  //   margin: 0 auto;
  //   display: flex;
  //   max-width: 100%;
  // }
`;
