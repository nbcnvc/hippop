import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../types/types';
import { useCurrentUser } from '../../store/userStore';
import { getMyItems } from '../../api/post';
import { getMyStores } from '../../api/store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { BookmarkProps } from '../../types/props';

function Bookmark({ activeSection }: BookmarkProps) {
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

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류입니다.</div>;
  }
  return (
    <div style={{ margin: '0 auto' }}>
      <div>
        {items &&
          items.pages.map((page: any, index: number) => {
            return (
              <div className="subs-wrapper" key={index}>
                <div className="fids">
                  {page.stores.slice(0, 3).map((store: Store) => (
                    <div className="user-subs">
                      <img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`}
                        alt={`Store Image`}
                        width={200}
                      />
                      <div className="info-box">
                        <div>
                          <h2>{store.title}</h2>
                          <p>
                            {store.period_start} ~ {store.period_end}
                          </p>
                        </div>
                        <Link to={`/detail/${store.id}`} key={store.id}>
                          <button>상세보기</button>
                        </Link>
                      </div>
                    </div>
                  ))}
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
}

export default Bookmark;
