import { useEffect, useMemo, useState } from 'react';
// 라이브러리
import moment from 'moment';
import shortid from 'shortid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { css, styled } from 'styled-components';
// 타입
import { FetchPost } from '../../../../types/types';
// api
import { getSearchPosts } from '../../../../api/post';
// 컴포넌트
import MNewPosts from './MNewPosts';
import MStorePosts from './MStorePosts';
// mui
import Skeleton from '@mui/material/Skeleton';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const MPosts = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용
  const [sortName, setSortName] = useState<string>('전체보기');
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
      setSortName('팝업메이트 구하기');
    }
    if (storeId == 0) {
      setSortName('전체보기');
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
    queryFn: ({ pageParam }) => getSearchPosts(pageParam, keyword, ctg, pathname),
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
    navigate(`/yourpage/${shortid.generate()}`, { state: { userId: userId } });
  };

  if (isLoading) {
    // 로딩 중일 때 스켈레톤 표시
    return (
      <PostContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <PostBox key={index}>
            <ContentBox>
              <Between>
                <Between>
                  <Skeleton variant="circular" width={24} height={24} /> &nbsp;
                  <Skeleton width={100} height={24} />
                </Between>
                <Date>
                  <Skeleton width={100} height={12} />
                </Date>
              </Between>
              &nbsp;
              <Title>
                <Skeleton width={400} height={20} />
              </Title>
              <Between>
                <Body>
                  <Skeleton width={400} height={30} />
                </Body>
                <Button>
                  <Skeleton width={60} height={16} />
                </Button>
              </Between>
            </ContentBox>
            <ProfileBox>
              <Between>
                <Skeleton variant="circular" width={70} height={70} />
                <div>
                  <Name style={{ marginBottom: '5px' }}>
                    <Skeleton width={80} height={20} />
                  </Name>
                  <Name>
                    <Skeleton width={80} height={14} />
                  </Name>
                </div>
              </Between>
              <ProfileButton>
                <Skeleton width={60} height={16} />
              </ProfileButton>
            </ProfileBox>
          </PostBox>
        ))}
        <Trigger ref={ref} />
      </PostContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <ButtonContainer>
        <ButtonBox>
          <Button name="전체보기" onClick={toggleSortButton}>
            전체보기
          </Button>
        </ButtonBox>
        <Between>
          <SelectBox value={ctg} onChange={onChangeCtg}>
            <option value={'카테고리'}>카테고리</option>
            <option value={'팝업스토어'}>팝업스토어</option>
            <option value={'작성자'}>작성자</option>
            <option value={'제목'}>제목</option>
            <option value={'내용'}>내용</option>
          </SelectBox>
          <div>
            {/* <Search /> */}
            <Input
              value={inputValue}
              onChange={onChangeInput}
              onKeyPress={handleKeyPress}
              placeholder="검색어를 입력하세요."
            />
          </div>
        </Between>
      </ButtonContainer>
      {sortName === '팝업메이트 구하기' && <MStorePosts />}
      {sortName === '전체보기' && <MNewPosts />}
      <PostContainer>
        {sortName === '검색' &&
          selectPosts &&
          selectPosts.length > 0 &&
          selectPosts?.map((post) => {
            const postText = post.body.replace(/<img.*?>/g, '');
            return (
              <PostBox key={post.id} onClick={() => naviDetail(post)}>
                <ContentBox>
                  <Between>
                    <Between>
                      <RoomRoundedIcon /> &nbsp;
                      <Store>{post.store.title}</Store>
                    </Between>
                    <Date>{moment(post?.created_at).format('YYYY.MM.DD HH:mm')}</Date>
                  </Between>
                  &nbsp;<Title>{post.title}</Title>
                  <Between>
                    <Body dangerouslySetInnerHTML={{ __html: postText }} />
                  </Between>
                  <DetailButton onClick={() => naviDetail(post)}>상세보기</DetailButton>
                </ContentBox>
                <ProfileBox>
                  <Betweens>
                    <Img
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.user.avatar_url}`}
                      alt="User Avatar"
                    />
                    <div>
                      <Name>
                        <NameLine>
                          <span>{post.user.name}</span>
                          님과
                        </NameLine>
                      </Name>
                      <Name>함께 하기</Name>
                    </div>
                  </Betweens>
                  <ProfileButton onClick={() => naviProfile(post.user.id)}>프로필</ProfileButton>
                </ProfileBox>
              </PostBox>
            );
          })}
        {sortName === '검색' && selectPosts && selectPosts.length === 0 && <NoResult>검색 결과가 없습니다 :(</NoResult>}
        <Trigger ref={ref} />
      </PostContainer>
    </>
  );
};

export default MPosts;

const mediaBarQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 60%;
  }
`;

const ButtonContainer = styled.div`
  max-width: 1920px;
  min-width: 764px;
  width: 51%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaBarQuery(900)}
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.button`
  float: right;
  width: 80px;
  margin-left: 10px;
  font-size: 14px;
  background-color: var(--second-color);
`;

const Input = styled.input`
  width: 200px;
  height: 33px;
  padding: 0 10px;
  margin-right: 10px;
  outline: none;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
`;

const SelectBox = styled.select`
  width: 120px;
  height: 38px;
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);

  outline: none;
  /* -moz-appearance: none; */
  /* -webkit-appearance: none; */
  /* appearance: none; */
`;

const Search = styled(SearchRoundedIcon)`
  position: absolute;
  margin: 8px 10px 0 10px;
`;

// 미디어 쿼리 세팅
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;
const PostContainer = styled.div`
  max-width: 1920px;
  min-width: 744px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  ${mediaQuery(900)}
`;

const PostBox = styled.div`
  width: 100%;
  height: 240px;
  background-color: #fff;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
  display: flex;
  cursor: pointer;

  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    border: 3px solid var(--primary-color);
  }
  &:active {
    background-color: rgb(215, 215, 219);
    transform: scale(0.98);
  }
`;

const ContentBox = styled.div`
  width: 70%;
  padding: 10px 25px 10px 20px;
  border-right: 2px dashed var(--fifth-color);
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Betweens = styled.div`
  gap: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 50px;
  @media (max-width: 1600px) {
    justify-content: center;
    flex-direction: column;
    margin-top: -10px;
  }
`;

const Store = styled.div`
  font-weight: 600;
  padding: 10px 0;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Body = styled.div`
  height: 63px;
  width: 430px;
  color: black;
  font-size: 14px;
  line-height: 1.5;
  padding: 15px 0 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;

const Date = styled.div`
  margin: 0 0 0 5px;
  font-size: 14px;
  font-weight: 400;
`;

const DetailButton = styled.button`
  float: right;
  width: 80px;
  font-size: 14px;
  margin-top: 42px;
`;

const ProfileBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 10px;
`;

const NameLine = styled.div`
  font-size: 14px;
  // background-color: white;
  // padding: 4px 6px;
  span {
    font-size: 18px;
    padding: 2px;
    background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px 20px;
  object-fit: cover;
  border-radius: 50%;
`;

const Trigger = styled.div`
  width: 100%;
  align-items: center;
`;

const ProfileButton = styled.button`
  float: right;
  width: 80px;
  font-size: 14px;
  margin-right: 0;

  position: absolute;
  top: 185px;
  right: 20px;
  @media (max-width: 1600px) {
    position: relative;
    justify-content: center;
    top: 0;
    // margin-bottom: 50px;
    right: 0;
    // flex-direction: column;
  }
`;

const NoResult = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
  font-size: 24px;
  font-weight: 700px;
`;
