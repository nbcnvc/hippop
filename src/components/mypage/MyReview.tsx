import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PostType, ReviewProps } from '../../types/types';
import { getMyItems } from '../../api/post';
import { getMyStores } from '../../api/store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCurrentUser } from '../../store/userStore';
import { useInView } from 'react-intersection-observer';
import { MyReviewProps } from '../../types/props';

const MyReview = ({ activeSection }: MyReviewProps) => {
  const currentUser = useCurrentUser();
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

  // 작성 날짜 잘라내기
  function formatDate(dateTimeString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);

    const [month, day, year] = formattedDate.split('/'); // 날짜를 월, 일, 년 순서로 분리
    return `${year}. ${month}. ${day}`; // 'YYYY-MM-DD' 형식으로 재조합하여 반환
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

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류입니다.</div>;
  }
  return (
    <div style={{ margin: '0 auto' }}>
      <div className="post-wrapper">
        {selectItems &&
          selectItems.map((post: PostType) => {
            const imageTags = extractImageTags(post.body);
            return (
              <div className="fid" key={post.id}>
                {imageTags.length > 0 ? (
                  <div>
                    <img src={imageTags[0]} alt={`Image 0`} width={250} />
                  </div>
                ) : (
                  <div>
                    <img src="/asset/defaultImg.png" alt="Default Image" width={250} />
                  </div>
                )}
                <div className="info-box">
                  <div>
                    <h2>{post.title}</h2>
                    <p>{formatDate(post.created_at)}</p>
                  </div>
                  <Link to={`/rdetail/${post.id}`}>
                    <button>상세보기</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
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
  );
};

export default MyReview;
