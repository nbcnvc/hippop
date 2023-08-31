import React, { useState, useEffect, useMemo } from 'react';
// 라이브러리
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
// import DatePicker1 from './DatePicker';
// 컴포넌트
import SearchCalendar from './SearchCalendar';
// api
import { fetchStoreIdCount } from '../../api/bookmark';
import { getSearchStore } from '../../api/store';
// 라이브러리
import moment from 'moment';
import _debounce from 'lodash/debounce';

// 타입
import { FetchsStore, SearchListProps, Store } from '../../types/types';
//스타일
import { styled } from 'styled-components';
// mui
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const SearchList = ({ storeData }: SearchListProps) => {
  const navigate = useNavigate();

  // 검색 inputValue state
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  // 기간별 filter state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // filter된 storeList state
  const [filteredStoreList, setFilteredStoreList] = useState<Store[] | null>(null);

  // moment 라이브러리로 원하는 형태로 날짜 포멧
  const momentStart = startDate ? moment(startDate).format('YYYY.MM.DD') : '0000.01.01';
  const momentEnd = endDate ? moment(endDate).format('YYYY.MM.DD') : '9999.12.31';

  // 검색결과 length state
  const [searchResultCount, setSearchResultCount] = useState<number>(0);

  // 디바운싱
  const debouncedSearch = _debounce((value: string) => {
    setDebouncedInputValue(value);
  }, 3000);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);

  // 인피니티 스크롤을 위한 데이터 조회
  const {
    data: stores,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchsStore>({
    queryKey: ['/search', debouncedInputValue, momentStart, momentEnd],
    queryFn: ({ pageParam }) => getSearchStore(pageParam, debouncedInputValue, momentStart, momentEnd),
    // Pass filter values
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

  // 북마크 카운트를 가져오는 함수
  const fetchBookmarkCounts = async () => {
    const storeIds = storeData.map((store) => store.id);
    // storeIds 배열에 있는 각 스토어 id를 순회하면서 fetchCount를 실행하고
    // 각 스토어의 북마크 카운트를 가져와서 객체 형태로 배열에 저장
    const countsPromises = storeIds.map(async (store_id) => {
      const count = await fetchStoreIdCount(store_id);
      return { store_id, count };
    });
    // Promise.all
    // 배열에 담긴 모든 비동기 작업이 완료 될떄까지 대기하고, 완료되면 모든 결과를 배열로 반환
    const bookmarkCounts = await Promise.all(countsPromises);
    return bookmarkCounts;
  };

  // 컴포넌트가 마운트되거나 storeData가 변경될 때 북마크 카운트를 가져옴
  const { data: bookMarkCounts } = useQuery(['bookMarkCounts', storeData], fetchBookmarkCounts);

  // 북마크 카운트가 많은 순으로 store_id를 정렬
  const sortedCounts = bookMarkCounts
    ? (bookMarkCounts as { store_id: number; count: number }[]).sort((a, b) => b.count - a.count)
    : [];

  // 정렬된 store id의 배열
  const sortedStoreIds = sortedCounts.map((item) => item.store_id);

  // 인기순(북마크 많은 순) 정렬된 storeData
  const sortedStores = storeData
    ? [...storeData].sort((a, b) => {
        const indexA = sortedStoreIds.indexOf(a.id);
        const indexB = sortedStoreIds.indexOf(b.id);

        return indexA - indexB;
      })
    : [];

  // 최신순 정렬된 storeData
  const latestStores = [...storeData]?.sort((a, b) => {
    const indexC = a.period_start;
    const indexD = b.period_start;

    return indexD.localeCompare(indexC); // Compare as strings
  });

  // 인기 팝업스토어 자르기
  const popStores = sortedStores?.slice(0, 3);

  // 최신 팝업스토어 자르기
  const latStores = latestStores?.slice(0, 3);

  // onChange 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  // 검색 버튼  핸들러
  const handleSearchButtonClick = () => {
    setDebouncedInputValue(inputValue);
    if (!inputValue) {
      alert('검색어를 입력해주세요!');
      setDebouncedInputValue('');
    }
  };

  // 데이터 필터링
  useEffect(() => {
    if (debouncedInputValue || inputValue || startDate || endDate) {
      const filteredStores = selectStores?.filter((store) => {
        const lowercaseInputValue = debouncedInputValue.toLowerCase();
        const storeStartDate = moment(store.period_start);
        const storeEndDate = moment(store.period_end);

        return (
          (store.title.toLowerCase().includes(lowercaseInputValue) ||
            store.body.toLowerCase().includes(lowercaseInputValue) ||
            store.location.toLowerCase().includes(lowercaseInputValue)) &&
          storeStartDate.isSameOrBefore(momentEnd) &&
          storeEndDate.isSameOrAfter(momentStart)
        );
      });

      // 검색 필터링 결과를 콘솔에 출력하여 확인
      console.log('필터링 결과:', filteredStores);

      // 검색 결과를 상태로 설정
      setFilteredStoreList(filteredStores || null);
      setSearchResultCount(filteredStores?.length || 0);
    }
  }, [selectStores, debouncedInputValue, startDate, endDate]);

  // SearchCalendar 컴포넌트에서 지정 검색한 date를 받아옴 props로 받아옴
  const handleSearch = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (storeData) {
      const filteredStores = storeData.filter((store) => {
        const storeStartDate = moment(store.period_start);
        const storeEndDate = moment(store.period_end);

        return storeStartDate.isSameOrBefore(momentEnd) && storeEndDate.isSameOrAfter(momentStart);
      });

      setFilteredStoreList(filteredStores);
    }
  };

  // 검색 초기화 handler
  const handleReset = () => {
    setInputValue('');

    setFilteredStoreList(null);
  };

  // detail page 이동
  const navDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <Container>
      <SearchBox>
        <Search />
        <form onSubmit={handleSearchButtonClick}>
          <SearchInput
            type="text"
            value={inputValue}
            placeholder="팝업스토어를 검색해보세요!"
            onChange={handleInputChange}
          />
          <button type="submit" className="custom-btn">
            검색
          </button>
        </form>

        {/* <Filter /> */}
        <Reset onClick={handleReset} />
      </SearchBox>
      <TagBox>
        <TagTitle>검색 Tip</TagTitle>
        <Tag> "성수" or "제목 또는 내용" </Tag>
      </TagBox>
      <TagBox>
        <TagTitle>인기 검색어</TagTitle>
        <Tag>#김우리 </Tag>
        <Tag>#나윤빈</Tag>
        <Tag>#양윤아</Tag>
        <Tag>#장혜진</Tag>
        <Tag>#조성록</Tag>
        <Tag>#조진명</Tag>
        <Tag>#최원장</Tag>
      </TagBox>
      {/* <DatePicker1 /> */}
      <SearchCalendar storeData={storeData} onSearch={handleSearch} />
      {searchResultCount > 0 && (
        <SearchResultCount>{`${searchResultCount}개의 검색 결과가 있습니다.`}</SearchResultCount>
      )}
      <>
        {filteredStoreList ? (
          <div>
            {filteredStoreList.length > 0 ? (
              <GridContainer>
                {filteredStoreList?.map((store) => (
                  <GridItem key={store.id} onClick={() => navDetail(store.id)}>
                    <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                    <div>{store.title}</div>
                    <div>
                      {store.period_start} ~ {store.period_end}{' '}
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
            ) : (
              <div>검색 결과가 없습니다.</div>
            )}
          </div>
        ) : (
          <>
            <Title>인기 팝업스토어</Title>
            <GridContainer>
              {popStores?.map((store: Store) => (
                <ImgWrapper key={store.id} onClick={() => navDetail(store.id)}>
                  <PImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                  <PopupTitle>{store.title}</PopupTitle>
                  <div>
                    {store.period_start} ~ {store.period_end}
                  </div>
                </ImgWrapper>
              ))}
            </GridContainer>

            <Title>최신 팝업스토어</Title>
            <GridContainer>
              {latStores?.map((store: Store) => (
                <ImgWrapper key={store.id} onClick={() => navDetail(store.id)}>
                  <PImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                  <PopupTitle>{store.title}</PopupTitle>
                  <div>
                    {store.period_start} ~ {store.period_end}
                  </div>
                </ImgWrapper>
              ))}
            </GridContainer>
          </>
        )}
      </>
      <div
        style={{
          backgroundColor: 'yellow',
          width: '50%',
          border: '1px solid black',
          padding: '20px',
          margin: '10px'
        }}
        ref={ref}
      >
        Trigger to Fetch Here
      </div>
    </Container>
  );
};

export default SearchList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
`;

const TagBox = styled.div`
  display: flex;

  margin-top: 40px;
`;

const TagTitle = styled.div`
  margin-right: 20px;
  font-weight: bold;
`;

const Tag = styled.div`
  margin-right: 5px;
`;

const SearchBox = styled.div`
  position: relative;

  margin-top: 20px;

  .custom-btn {
    border: 2px solid black;

    border-bottom: 3.4px solid var(--fifth-color);
    border-radius: 0 18px 18px 0;
    padding: 14.4px 20px;
  }
`;

const Reset = styled(RestartAltIcon)`
  position: absolute;

  top: 25%;
  right: 15%;
`;

const SearchInput = styled.input`
  width: 450px;
  height: 48px;

  box-shadow: 1px;

  border: px solid black;
  border-right: none;
  border-radius: 18px 0px 0px 18px;

  outline: none;

  padding-left: 35px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;

  padding: 20px;

  margin-top: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1Tag = styled.h1`
  font-size: 28px;
  color: #333333;
  /* font-weight: bold; */
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  padding: 4px;
`;

const SearchCountBox = styled.div`
  font-size: 16px;
  margin: 10px 0;
  /* color: #f24d0d; */

  margin-top: 35px;
`;

const SearchCount = styled.span`
  color: var(--primary-color);
`;

const GridContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬 */

  display: grid;

  grid-template-columns: repeat(3, 1fr); // 한 줄에 두 개의 열
  gap: 50px; // 열 사이의 간격 조정

  max-width: 1920px; /* 그리드가 너무 넓어지는 것을 제한 */
  width: 100%;

  margin-top: 50px;
`;

const Card = styled.div`
  width: 380px;
  height: 500px;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const InfoBox = styled.div`
  width: 330px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 20px;
`;

const Img = styled.img`
  width: 340px;
  height: 370px;
  /* margin-top: 10px; */
  object-fit: cover;
  border-radius: 10px;

  border: 3px solid var(--fifth-color);
`;

const StoreName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  font-size: 20px;
  font-weight: bold;

  width: 235px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 7px 0 7px 0;
`;

const BtnBox = styled.div``;

const DetailBtn = styled.button`
  /* background-color: var(--primary-color); */
  background-color: var(--second-color);
  /* background-color: var(--third-color); */
  /* color: black; */
  color: white;
`;

const Ref = styled.div`
  margin-bottom: 150px;
`;
