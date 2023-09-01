import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getProfileImg, getUser } from '../api/user'; // 사용자 정보를 가져오는 함수
import { UserInfo, Store, PostType } from '../types/types';
import { getMyItems } from '../api/post'; // 게시글 가져오는 함수
import { getMyStores } from '../api/store'; // 북마크 가져오는 함수
import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import format from 'date-fns/format';
import { Parser } from 'htmlparser2';

const YourPage = () => {
  const { id } = useParams();
  const userId: string = id as string;
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [activeSection, setActiveSection] = useState('myReview'); // 기본값 설정

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery(['user', id], () => getUser(userId));
  console.log(user);
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
      return getMyItems(userIdToUse, 'posts', pageParam);
    } else if (activeSection === 'myBookmark') {
      return getMyStores(userIdToUse, pageParam);
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

      if (profileImgData && profileImgData.avatar_url) {
        // avatar_url이 존재하면 해당 URL을 사용하여 이미지를 렌더링
        `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${profileImgData.avatar_url}`;
      }
    }
  };

  useEffect(() => {
    if (userData) {
      fetchProfileImage();
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching user data.</div>;
  }
  console.log(selectItems);

  if (isUserLoading) {
    return <div>Loading user data...</div>;
  }

  if (isUserError) {
    return <div>Error occurred while fetching user data.</div>;
  }

  return (
    <div>
      {/* 유저 정보 표시 */}
      <div>
        <h2>User Information</h2>
        {/* <img src={user?.avatar_url} alt="User Avatar" /> */}
        <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user?.avatar_url}`} alt="User Avatar" width={200} />
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>

      <button data-section="myReview" onClick={handleSectionChange}>
        나의 게시글
      </button>
      <button data-section="myBookmark" onClick={handleSectionChange}>
        나의 북마크
      </button>
      <div className="content-wrapper">
        {activeSection === 'myReview' ? (
          // Render 게시글 컨텐츠
          <div>
            <h3>My Review</h3>
            <div className="post-wrapper">
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
                  <Link to={`/rdetail/${post.id}`} key={post.id}>
                    {imageTags.length > 0 ? (
                      <div>
                        <img src={imageTags[0]} alt={`Image`} width={250} />
                      </div>
                    ) : (
                      <div>
                        <img src="/asset/defaultImg.jpg" alt="Default Image" width={250} />
                      </div>
                    )}
                    <h2>{post.title}</h2>
                    <p>{format(new Date(post.created_at), 'yyyy-MM-dd')}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          // Render 북마크 컨텐츠
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
        )}
      </div>
      <div
        style={{
          backgroundColor: 'yellow',
          width: '90%',
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

export default YourPage;

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
        width: 250px;
        position: absolute;
        display: flex;

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
      }
    }
    ul {
      position: absolute;
      width: 100px;
      background: white;
      left: 318px;
      top: 280px;
      border-radius: 8px;
    }
    li {
      padding: 5px 10px;
      &:hover {
        border-radius: 8px;
        background-color: #f1f1f1;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
  }
  .subs-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
  }
`;
