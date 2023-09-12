import moment from 'moment';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { FetchPost } from '../../../../types/types';
import { getStorePosts } from '../../../../api/post';

import { St } from './style/St.MPosts';
import Skeleton from '@mui/material/Skeleton';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

const MStorePosts = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용
  const storeTitle: string = state?.storeTitle;

  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchPost>({
    queryKey: [`${queryKey}`, storeId, pathname],
    queryFn: ({ pageParam }) => getStorePosts(pageParam, storeId, pathname),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
      return null; // 마지막 페이지인 경우
    }
  });

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
    navigate(`/yourpage/${userId}`);
  };

  if (isLoading) {
    // 로딩 중일 때 스켈레톤 표시
    return (
      <St.PostContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <St.PostBox key={index}>
            <St.ContentBox>
              <St.Between>
                <St.Between>
                  <Skeleton variant="circular" width={24} height={24} /> &nbsp;
                  <Skeleton width={100} height={24} />
                </St.Between>
                <St.Date>
                  <Skeleton width={100} height={12} />
                </St.Date>
              </St.Between>
              &nbsp;
              <St.Title>
                <Skeleton width={400} height={20} />
              </St.Title>
              <St.Between>
                <St.Body>
                  <Skeleton width={400} height={30} />
                </St.Body>
              </St.Between>
            </St.ContentBox>
            <St.ProfileBox>
              <St.Between>
                <Skeleton variant="circular" width={70} height={70} />
                <div>
                  <St.Name style={{ marginBottom: '5px' }}>
                    <Skeleton width={80} height={20} />
                  </St.Name>
                  <St.Name>
                    <Skeleton width={80} height={14} />
                  </St.Name>
                </div>
              </St.Between>
            </St.ProfileBox>
          </St.PostBox>
        ))}
        <St.Trigger ref={ref} />
      </St.PostContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <St.PostContainer>
        {selectPosts?.map((post) => {
          const postText = post.body.replace(/<img.*?>/g, '');
          return (
            <St.PostBox key={post.id}>
              <St.ContentBox onClick={() => naviDetail(post)}>
                <St.Between>
                  <St.Between>
                    <RoomRoundedIcon /> &nbsp;
                    <St.Store>{post.store.title}</St.Store>
                  </St.Between>
                  <St.Date>{moment(post?.created_at).format('YYYY.MM.DD HH:mm')}</St.Date>
                </St.Between>
                &nbsp;<St.Title>{post.title}</St.Title>
                <St.Between>
                  <St.Body dangerouslySetInnerHTML={{ __html: postText }} />
                </St.Between>
                <St.DetailButton onClick={() => naviDetail(post)}>상세보기</St.DetailButton>
              </St.ContentBox>
              <St.ProfileBox onClick={() => naviProfile(post.user.id)}>
                <St.Betweens>
                  <St.Img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.user.avatar_url}`}
                    alt="User Avatar"
                  />
                  <div>
                    <St.Name>
                      <St.NameLine>
                        <span>{post.user.name}</span>
                        님과
                      </St.NameLine>
                    </St.Name>
                    <St.Name>함께 하기</St.Name>
                  </div>
                </St.Betweens>
                <St.ProfileButton onClick={() => naviProfile(post.user.id)}>프로필</St.ProfileButton>
              </St.ProfileBox>
            </St.PostBox>
          );
        })}
        {selectPosts && selectPosts.length === 0 && (
          <St.NoResultBox>
            <St.NoResult>
              <span>'{storeTitle}'</span>을 함께 할 팝업메이트가 없어요 :(
            </St.NoResult>
            <St.NoResult>함께 할 팝업메이트를 구해보세요!</St.NoResult>
          </St.NoResultBox>
        )}
        <St.Trigger ref={ref} />
      </St.PostContainer>
    </>
  );
};

export default MStorePosts;
