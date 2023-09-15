import RNewPosts from './RNewPosts';
import RStorePosts from './RStorePosts';
import RPopularPosts from './RPopularPosts';
import CommentCount from './CommentCount';

import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { FetchPost, PostType } from '../../../../types/types';
import { getSearchPosts } from '../../../../api/post';

import { St } from './style/St.RPosts';
import Skeleton from '@mui/material/Skeleton';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';

const RPosts = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용
  const [sortName, setSortName] = useState<string>('최신순');
  const [ctg, setCtg] = useState<string>('카테고리');
  const onChangeCtg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCtg(e.target.value);
  };
  const toggleSortButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setSortName(name);
  };

  useEffect(() => {
    if (storeId !== 0) {
      setSortName('후기보러 가기');
    }
    if (storeId == 0) {
      setSortName('최신순');
    }
  }, [storeId]);

  // 검색 로직
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSortName('검색');
    fetchNextPage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(inputValue);
      handleSearch();
    }
  };

  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchPost>({
    queryKey: [`search${queryKey}`, keyword, ctg, pathname],
    queryFn: ({ pageParam = 1 }) => getSearchPosts(pageParam, keyword, ctg, pathname),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
      // return null; // 마지막 페이지인 경우
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

  // 대표이미지
  const extractImageTags = (html: string) => {
    const imageTags = [];
    const pattern = /<img.*?src=["'](.*?)["'].*?>/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      imageTags.push(match[1]);
    }

    return imageTags;
  };

  // 상세페이지로 넘어가기
  const naviDetail = (post: PostType) => {
    navigate(`/rdetail/${post.id}`);
  };
  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);
  if (isLoading) {
    // 로딩 중일 때 스켈레톤을 렌더링합니다.
    return (
      <St.PostContainer>
        {Array.from({ length: 5 }, (_, index) => (
          <St.PostBox key={index}>
            <div>
              <St.ImageBoxs>
                <Skeleton variant="rectangular" width="100%" height={190} animation="wave" />
              </St.ImageBoxs>
            </div>
            <St.ContentBox>
              <St.Between>
                <St.Between>
                  <RoomRoundedIcon /> &nbsp;
                  <Skeleton width="80%" animation="wave" />
                </St.Between>
                <St.Between>
                  <NotesRoundedIcon /> &nbsp;
                  <Skeleton width="50px" animation="wave" />
                </St.Between>
              </St.Between>
              &nbsp;
              <Skeleton width="80%" animation="wave" />
              <Skeleton width="95%" animation="wave" />
              <St.Between>
                <Skeleton width="60px" animation="wave" />
                <Skeleton width="80px" animation="wave" />
              </St.Between>
            </St.ContentBox>
          </St.PostBox>
        ))}
      </St.PostContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <St.ButtonContainer>
        <St.Between>
          <St.Between>
            <St.ButtonBox>
              <St.Button name="최신순" onClick={toggleSortButton}>
                최신순
              </St.Button>
              <St.Button name="댓글순" onClick={toggleSortButton}>
                댓글순
              </St.Button>
            </St.ButtonBox>
          </St.Between>
          <St.Between>
            <St.SelectBox value={ctg} onChange={onChangeCtg}>
              <option value={'카테고리'}>카테고리</option>
              <option value={'팝업스토어'}>팝업스토어</option>
              <option value={'제목'}>제목</option>
              <option value={'내용'}>내용</option>
            </St.SelectBox>
            <div>
              {/* <Search /> */}
              <St.Input
                value={inputValue}
                onChange={onChangeInput}
                onKeyPress={handleKeyPress}
                placeholder="검색어를 입력하세요."
              />
            </div>
          </St.Between>
        </St.Between>
      </St.ButtonContainer>
      {sortName === '후기보러 가기' && <RStorePosts />}
      {sortName === '최신순' && <RNewPosts />}
      {sortName === '댓글순' && <RPopularPosts />}
      <St.PostContainer>
        {sortName === '검색' &&
          selectPosts &&
          selectPosts.length > 0 &&
          selectPosts?.map((post) => {
            const imageTags = extractImageTags(post.body);
            const postText = post.body.replace(/<img.*?>/g, '');
            return (
              <St.PostBox key={post.id} onClick={() => naviDetail(post)}>
                {imageTags.length > 0 ? (
                  <div className="img-div">
                    <St.ImageBox src={imageTags[0]} />
                  </div>
                ) : (
                  <div className="img-div">
                    <St.ImageBox src="/asset/defaultImg.png" alt="Default Image" width={250} height={140} />
                  </div>
                )}
                <St.ContentBox>
                  <St.Between>
                    <St.Between>
                      <RoomRoundedIcon /> &nbsp;
                      <St.Store>{post.store.title}</St.Store>
                    </St.Between>
                    <St.Between>
                      <NotesRoundedIcon /> &nbsp;
                      <CommentCount postId={post.id} />
                    </St.Between>
                  </St.Between>
                  &nbsp;<St.Title>{post.title}</St.Title>
                  <St.Body dangerouslySetInnerHTML={{ __html: postText }} />
                  <St.Between>
                    <St.Date>{moment(post?.created_at).format('YYYY.MM.DD HH:mm')}</St.Date>
                    <St.DetailButton onClick={() => naviDetail(post)}>상세보기</St.DetailButton>
                  </St.Between>
                </St.ContentBox>
              </St.PostBox>
            );
          })}
        {sortName === '검색' && selectPosts && selectPosts.length === 0 && (
          <St.NoResult>검색 결과가 없습니다 :(</St.NoResult>
        )}
        <St.Trigger ref={ref} />
      </St.PostContainer>
    </>
  );
};

export default RPosts;
