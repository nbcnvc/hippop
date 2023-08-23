import React, { useState, useEffect, useMemo } from 'react';
// 라이브러리
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
// import DatePicker1 from './DatePicker';
// 컴포넌트
import SearchCalendar from './SearchCalendar';
// api
import { fetchAllBookMark } from '../../api/bookmark';
import { getInfinityStore } from '../../api/store';
// 타입
import { FetchsStore, SearchListProps, Store } from '../../types/types';
//스타일
import { styled } from 'styled-components';
// mui
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import moment from 'moment';

const SearchList = ({ storeData }: SearchListProps) => {
  const navigate = useNavigate();

  // 검색 inputValue state
  const [inputValue, setInputValue] = useState<string>('');

  // 기간별 filter state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // filter된 storeList state
  const [filteredStoreList, setFilteredStoreList] = useState<Store[] | null>(null);

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

  // 북마크 전체 조회
  const { data: bookMark } = useQuery(['bookMark'], () => fetchAllBookMark());

  // store_id 발생 횟수를 저장할 객체 생성
  const storeIdCounts: Record<string, number> = {};

  // 각 store_id의 발생 횟수를 세기
  bookMark?.forEach((bookmark) => {
    const { store_id } = bookmark;
    if (!storeIdCounts[store_id]) {
      storeIdCounts[store_id] = 1;
    } else {
      storeIdCounts[store_id]++;
    }
  });

  // storeIdCounts 객체를 배열로 변환하여 정렬
  const sortedCounts = Object.entries(storeIdCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([store_id, count]) => ({ store_id, count }));

  // 정렬된 store id의 배열
  const sortedStoreIds = sortedCounts.map((item) => item.store_id);

  // 북마크 순 정렬된 storeData
  const sortedStores: any = storeData?.sort((a, b) => {
    const indexA = sortedStoreIds.indexOf(a.id.toString());
    const indexB = sortedStoreIds.indexOf(b.id.toString());

    return indexA - indexB;
  });

  // 최신순 정렬된 storeData
  const latestStores = [...storeData]?.sort((a, b) => {
    const indexC = a.period_start;
    const indexD = b.period_start;

    return indexD.localeCompare(indexC); // Compare as strings
  });

  // 데이터 필터링
  useEffect(() => {
    // storeData가 존재하면 필터링을 진행합니다.
    if (filteredStoreList || inputValue || startDate || endDate) {
      const filteredStores = selectStores?.filter((store) => {
        const lowercaseInputValue = inputValue.toLowerCase();
        const storeStartDate = moment(store.period_start);
        const storeEndDate = moment(store.period_end);

        const momentStart = startDate ? moment(startDate).format('YYYY.MM.DD') : '0000.01.01';
        const momentEnd = endDate ? moment(endDate).format('YYYY.MM.DD') : '9999.12.31';

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
    }
  }, [selectStores, inputValue, startDate, endDate]);

  // onChange 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('새로운 입력 값:', newValue);
    setInputValue(newValue);
  };

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

  // 인기 팝업스토어 자르기
  const popStores = sortedStores?.slice(0, 3);

  // 최신 팝업스토어 자르기
  const latStores = latestStores?.slice(0, 3);

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
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="팝업스토어를 검색해보세요!"
        />
        <Filter />
        <Reset onClick={handleReset} />
      </SearchBox>

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
          width: '100%',
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

const SearchBox = styled.div`
  position: relative;

  margin-top: 50px;
`;

const Filter = styled(FilterAltIcon)`
  position: absolute;

  top: 25%;
  right: 5%;
`;

const Reset = styled(RestartAltIcon)`
  position: absolute;

  top: 25%;
  right: 0;
`;

const SearchInput = styled.input`
  width: 450px;
  height: 50px;

  box-shadow: 1px;

  border: none;
  border-bottom: 2px solid black;

  outline: none;

  padding-left: 35px;
`;

const Search = styled(SearchIcon)`
  position: absolute;

  top: 25%;
`;

const TagTitle = styled.div`
  margin-right: 20px;
  font-weight: bold;
`;

const TagBox = styled.div`
  display: flex;

  margin-top: 20px;
`;

const Tag = styled.div`
  margin-right: 5px;
`;

const ImgWrapper = styled.div`
  margin-right: 30px;

  cursor: pointer;
`;

const PImg = styled.img`
  width: 270px;
  height: 330px;

  object-fit: cover;
`;

const PopupTitle = styled.div`
  margin-top: 15px;

  font-weight: bold;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 두 개의 열 */
  gap: 20px; /* 열 사이의 간격 조정 */
  max-width: 900px; /* 그리드가 너무 넓어지는 것을 제한 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const GridItem = styled.div`
  cursor: pointer;
  padding: 10px;
`;

const Img = styled.img`
  width: 290px;
  height: 330px;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;

  padding: 20px;

  margin-top: 50px;
`;
