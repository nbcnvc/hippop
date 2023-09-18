import React, { useState, useEffect, useMemo } from 'react';
// 라이브러리
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import _debounce from 'lodash/debounce';
// 컴포넌트
import SearchCalendar from './SearchCalendar';
// api
import { fetchPopularStore } from '../../api/bookmark';
import { fetchNewStore, getSearchStore } from '../../api/store';
// 타입
import { FetchsStore, SliderButton, Store } from '../../types/types';
// mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
// react-icons
import { FaRegLightbulb } from 'react-icons/fa';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// 스타일
import { St } from './style/St.SearchList';

const SearchList = () => {
  const navigate = useNavigate();

  // 검색 inputValue state
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');
  // 기간별 filter state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // filter된 storeList state
  const [filteredStoreList, setFilteredStoreList] = useState<Store[] | null>(null);

  const formatDate = (date: any) => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  // moment 라이브러리로 원하는 형태로 날짜 포멧
  const formatStart = startDate ? formatDate(startDate) : '0000.01.01';
  const formatEnd = endDate ? formatDate(endDate) : '9999.12.31';

  // 검색결과 length state
  const [searchResultCount, setSearchResultCount] = useState<number>(0);

  // 이전 검색어 state
  const [previousSearchTerms, setPreviousSearchTerms] = useState<string[]>([]);

  // 쿼리
  const queryClient = useQueryClient();

  // 디바운싱 _debounce 함수를 사용하여 입력 값이 변경될 때 24시간 동안 대기한 다음 값을 없데이트
  const debouncedSearch = _debounce((value: string) => {
    setDebouncedInputValue(value);
  }, 86400000);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);

  // 인피니티 스크롤을 위한 데이터 조회
  const {
    data: stores,
    isLoading: isScrollLoding,
    isError: isScrollError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchsStore>({
    queryKey: ['/search', debouncedInputValue, formatStart, formatEnd],
    queryFn: ({ pageParam }) => getSearchStore(pageParam, debouncedInputValue, formatStart, formatEnd),
    // Pass filter values
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages)
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
    }
  });
  console.log('stores', stores);
  // 캐싱 처리
  const refreshData = () => {
    queryClient.invalidateQueries(['/search', debouncedInputValue, formatStart, formatEnd]);
  };

  // 인피니티 스크롤로 필터된 store
  // useMemo 성능 최적화를 목적으로
  // 계산 결과를 메모이제이션하여 이전에 계산한 결과를 재사용할 수 있도록 도와줌
  // 의존성 배열의 변경될 때마다 다시 계산됨
  const selectStores = useMemo(() => {
    return stores?.pages
      .map((data) => {
        return data.stores;
      })
      .flat(); // map함수를 사용하여 추출한 store의 목록을 하나의 배열로 만듬 => stores는 페이지별로 분리되어 있기 때문
  }, [stores]);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    // 요소의 가시성을 감시하고 해당 요소가 화면에 나타나거나 사라질 때 콜백함수를 실행하도록 도와줌
    threshold: 1, // 맨 아래에 교차될 때(100%)
    onChange: (inView: any) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return; // !hasNextPage 더이상 가져올 페이지 x /  isFetchingNextPage 이미 데이터를 가져오는 중으로 중복 요청을 방지
      fetchNextPage();
    }
  });

  // 인기순 팝업스토어 가져오기
  const { data: popularStores } = useQuery(['popular'], fetchPopularStore);

  // 최신 팝업스토어 조회
  const {
    data: latestStore,
    isLoading,
    isError
  } = useQuery<Store[] | null>({
    queryKey: ['storeData'],
    queryFn: () => fetchNewStore()
  });

  // 인기 팝업스토어 10개 자르기
  const popStores = popularStores?.slice(0, 10);

  // 최신 팝업스토어 10개 자르기
  const latStores = latestStore?.slice(0, 10);

  // onChange 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 검색 버튼 핸들러
  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    if (!inputValue.trim()) {
      toast.info('검색어를 입력해주세요 ! :)', {
        className: 'custom-toast',
        theme: 'light'
      });
    } else {
      // 검색어가 입력되었을 경우, 이를 이전 검색어 목록에 추가하고 debouncedInputValue 상태를 업데이트하여 검색을 업데이트
      setPreviousSearchTerms((prevTerms) => [...prevTerms, inputValue]);
      setDebouncedInputValue(inputValue);
    }
    // refreshData();
  };

  // 데이터 필터링
  useEffect(() => {
    if (debouncedInputValue || startDate || endDate) {
      // 검색어가 입력되었거나 시작 날짜 또는 종료 날짜가 존재하는 경우에만 실행
      console.log('selectStores', selectStores);
      const filteredStores = selectStores?.filter((store) => {
        // store를 필터링
        const lowercaseInputValue = debouncedInputValue?.toLowerCase();
        const storeStartDate = store.period_start;
        const storeEndDate = store.period_end;

        return (
          (store.title.toLowerCase().includes(lowercaseInputValue) ||
            store.body.toLowerCase().includes(lowercaseInputValue) ||
            store.location.toLowerCase().includes(lowercaseInputValue)) &&
          storeStartDate.localeCompare(storeEndDate) &&
          storeEndDate.localeCompare(storeStartDate)
        );
      });
      console.log('filteredStores', filteredStores);
      setFilteredStoreList(filteredStores || null); // 검색 결과를 상태로 설정
      setSearchResultCount(filteredStores?.length || 0); // 검색 결과의 개수를 설정
    }
  }, [selectStores, debouncedInputValue, startDate, endDate]);

  // SearchCalendar 컴포넌트에서 지정 검색한 date를 받아옴 props로 받아옴
  const handleSearch = (start: Date, end: Date) => {
    // 받아온 시작일과 종료일을 상태로 업데이트
    setStartDate(start);
    setEndDate(end);

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (latestStore) {
      const filteredStores = latestStore.filter((store) => {
        // storeData를 필터링
        // 각 상점의 시작 날짜와 종료 날짜를 moment 객체로 변환
        const storeStartDate = moment(store.period_start);
        const storeEndDate = moment(store.period_end);

        // 선택한 종료일 이전이거나 같고, 선택한 시작일 이후이거나 같은 상점만 선택
        return storeStartDate.isSameOrBefore(momentEnd) && storeEndDate.isSameOrAfter(momentStart);
      });

      setFilteredStoreList(filteredStores); // 필터링된 상점 목록을 상태로 업데이트
    }
    // refreshData();
  };

  // 검색어 칩 삭제
  const handleInputDelete = (term: string) => {
    setInputValue(''); // 입력 값 초기화
    // 이전 검색어 목록에서 현재 삭제하려는 검색어를 제외한 새로운 배열을 생성
    const newPreviousSearchTerms = previousSearchTerms.filter((index) => index !== term);
    setPreviousSearchTerms(newPreviousSearchTerms); // 이전 검색어 목록을 업데이트

    if (startDate && endDate && (formatStart !== '0000.01.01' || formatEnd !== '9999.12.31')) {
      // 이전 검색어 목록에서 마지막 검색어를 가져옴
      setDebouncedInputValue(newPreviousSearchTerms[newPreviousSearchTerms.length - 1]);

      if (newPreviousSearchTerms.length === 0) {
        setDebouncedInputValue(''); // 검색어를 빈 문자열로 설정하여 검색 결과를 초기화
      }
    } else if (formatStart === '0000.01.01' || formatEnd === '9999.12.31') {
      // 시작일과 종료일이 하나라도 기본 값인 경우
      setDebouncedInputValue(newPreviousSearchTerms[newPreviousSearchTerms.length - 1]);

      if (newPreviousSearchTerms.length === 0) {
        setFilteredStoreList(null); // 필터링된 상점 목록을 초기화
      }
    }
  };

  // 날짜 칩 삭제
  const handleDateDelete = () => {
    setFilteredStoreList(null); // 필터링된 storelist를 초기화
    setStartDate(null); // 시작 날짜 초기화
    setEndDate(null); // 종료 날짜 초기화
    refreshData(); // 데이터를 새로고침
  };

  // detail page 이동
  const navDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const PrevArrow = ({ onClick }: SliderButton) => {
    return (
      <St.SliderBtn onClick={onClick} type="button">
        ＜
      </St.SliderBtn>
    );
  };

  const NextArrow = ({ onClick }: SliderButton) => {
    return (
      <St.SliderBtn onClick={onClick} type="button">
        ＞
      </St.SliderBtn>
    );
  };

  // 위에서 계산한 값을 사용하여 설정 객체를 생성
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const combinedLabel = `${formatStart} ~ ${formatEnd}`;

  const latestChips = previousSearchTerms.slice(-5);


  if (isLoading) {
    return (
      <div>
        <St.Container>
          <St.TagBox>
            <St.TagTitle>
              <FaRegLightbulb />
              검색 Tip
            </St.TagTitle>
            <St.Tag> "성동구" or "제목 또는 내용" </St.Tag>
          </St.TagBox>
          <St.SearchBox>
            {/* <Search /> */}
            <form>
              <St.SearchInput
                type="text"
                value={inputValue}
                placeholder="팝업스토어를 검색해보세요!"
                onChange={handleInputChange}
              />
              <button type="submit" className="custom-btn">
                검색
              </button>
            </form>
            {/* <Reset onClick={handleReset} /> */}
          </St.SearchBox>
          <div style={{ display: 'flex', marginTop: '30px', gap: '30px' }}>
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={150} height={20} />
          </div>
          <div style={{ display: 'flex', marginTop: '100px', marginBottom: '30px' }}>
            <Skeleton variant="text" width={250} height={20} />
          </div>

          <div style={{ display: 'flex', gap: '30px' }}>
            <St.Card>
              <Skeleton variant="rectangular" width={340} height={369} />
              <St.InfoBox>
                <div>
                  <Skeleton variant="text" width={150} height={20} />
                  <Skeleton variant="text" width={100} height={15} />
                  <Skeleton variant="text" width={100} height={15} />
                </div>
                <Skeleton variant="rectangular" width={100} height={40} />
              </St.InfoBox>
            </St.Card>

            <St.Card>
              <Skeleton variant="rectangular" width={340} height={369} />
              <St.InfoBox>
                <div>
                  <Skeleton variant="text" width={150} height={20} />
                  <Skeleton variant="text" width={100} height={15} />
                  <Skeleton variant="text" width={100} height={15} />
                </div>
                <Skeleton variant="rectangular" width={100} height={40} />
              </St.InfoBox>
            </St.Card>
            <St.SkeletonCard>
              <St.Card>
                <Skeleton variant="rectangular" width={340} height={369} />
                <St.InfoBox>
                  <div>
                    <Skeleton variant="text" width={150} height={20} />
                    <Skeleton variant="text" width={100} height={15} />
                    <Skeleton variant="text" width={100} height={15} />
                  </div>
                  <Skeleton variant="rectangular" width={100} height={40} />
                </St.InfoBox>
              </St.Card>
            </St.SkeletonCard>
          </div>
        </St.Container>
      </div>
    );
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (isScrollLoding) {
    return (
      <div>
        <St.Container>
          <St.TagBox>
            <St.TagTitle>
              <FaRegLightbulb />
              검색 Tip
            </St.TagTitle>
            <St.Tag> "성동구" or "제목 또는 내용" </St.Tag>
          </St.TagBox>
          <St.SearchBox>
            {/* <Search /> */}
            <form>
              <St.SearchInput
                type="text"
                value={inputValue}
                placeholder="팝업스토어를 검색해보세요!"
                onChange={handleInputChange}
              />
              <button type="submit" className="custom-btn">
                검색
              </button>
            </form>
            {/* <Reset onClick={handleReset} /> */}
          </St.SearchBox>
          <div style={{ display: 'flex', marginTop: '30px', gap: '30px' }}>
            <Skeleton variant="text" width={150} height={60} />
            <Skeleton variant="text" width={150} height={60} />
          </div>

          <div style={{ display: 'flex', gap: '30px', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '200px',
                marginBottom: '30px'
              }}
            >
              <Skeleton variant="text" width={250} height={20} />
            </div>
            <div style={{ display: 'flex', gap: '30px' }}>
              <St.Card>
                <Skeleton variant="rectangular" width={280} height={369} />
                <St.InfoBox>
                  <div>
                    <Skeleton variant="text" width={150} height={20} />
                    <Skeleton variant="text" width={100} height={15} />
                    <Skeleton variant="text" width={100} height={15} />
                  </div>
                  <Skeleton variant="rectangular" width={100} height={40} />
                </St.InfoBox>
              </St.Card>

              <St.Card>
                <Skeleton variant="rectangular" width={280} height={369} />
                <St.InfoBox>
                  <div>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={100} height={15} />
                    <Skeleton variant="text" width={100} height={15} />
                  </div>
                  <Skeleton variant="rectangular" width={100} height={40} />
                </St.InfoBox>
              </St.Card>

              <St.SkeletonCard>
                <St.Card>
                  <Skeleton variant="rectangular" width={340} height={369} />
                  <St.InfoBox>
                    <div>
                      <Skeleton variant="text" width={150} height={20} />
                      <Skeleton variant="text" width={100} height={15} />
                      <Skeleton variant="text" width={100} height={15} />
                    </div>
                    <Skeleton variant="rectangular" width={100} height={40} />
                  </St.InfoBox>
                </St.Card>
              </St.SkeletonCard>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '100px',
                marginBottom: '30px'
              }}
            >
              <Skeleton variant="text" width={250} height={20} />
            </div>
            <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
              <St.Card>
                <Skeleton variant="rectangular" width={280} height={369} />
                <St.InfoBox>
                  <div>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={100} height={15} />
                    <Skeleton variant="text" width={100} height={15} />
                  </div>
                  <Skeleton variant="rectangular" width={100} height={40} />
                </St.InfoBox>
              </St.Card>
              <St.Card>
                <Skeleton variant="rectangular" width={280} height={369} />
                <St.InfoBox>
                  <div>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={100} height={15} />
                    <Skeleton variant="text" width={100} height={15} />
                  </div>
                  <Skeleton variant="rectangular" width={100} height={40} />
                </St.InfoBox>
              </St.Card>
              <St.SkeletonCard>
                <St.Card>
                  <Skeleton variant="rectangular" width={340} height={369} />
                  <St.InfoBox>
                    <div>
                      <Skeleton variant="text" width={150} height={20} />
                      <Skeleton variant="text" width={100} height={15} />
                      <Skeleton variant="text" width={100} height={15} />
                    </div>
                    <Skeleton variant="rectangular" width={100} height={40} />
                  </St.InfoBox>
                </St.Card>
              </St.SkeletonCard>
            </div>
          </div>
        </St.Container>
      </div>
    );
  }
  if (isScrollError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <St.Container>
      <St.TagBox>
        <FaRegLightbulb />
        <St.TagTitle>검색 Tip</St.TagTitle>
        <St.Tag> "성동구" or "제목 또는 내용" </St.Tag>
      </St.TagBox>
      <St.SearchBox>
        {/* <Search /> */}
        <form
          onSubmit={(e) => {
            handleSearchFormSubmit(e);
          }}
        >
          <St.SearchInput
            type="text"
            value={inputValue}
            placeholder="팝업스토어를 검색해보세요!"
            onChange={handleInputChange}
          />
          <button type="submit" className="custom-btn">
            검색
          </button>
        </form>
      </St.SearchBox>
      <SearchCalendar
        storeData={latestStore}
        onSearch={handleSearch}
        resetStartDate={startDate}
        resetEndDate={endDate}
      />
      {filteredStoreList ? (
        <St.ChipBoX>
          <Stack direction="row" spacing={1}>
            {latestChips.map((term) => (
              <Chip key={term} label={term} onDelete={() => handleInputDelete(term)} />
            ))}

            {(formatStart !== '0000.01.01' || formatEnd !== '9999.12.31') && (
              <>
                <Chip label={combinedLabel} onDelete={handleDateDelete} />
              </>
            )}
          </Stack>
        </St.ChipBoX>
      ) : (
        <St.ChipBoX></St.ChipBoX>
      )}
      <>
        {filteredStoreList ? (
          <div>
            {filteredStoreList.length > 0 ? (
              <>
                <St.Title>
                  <St.H1Tag>검색 결과 </St.H1Tag>
                  {searchResultCount > 0 && filteredStoreList && (
                    <St.SearchCountBox>
                      총 <St.SearchCount>{stores.pages[0].count}개</St.SearchCount>의 결과를 찾았어요! :)
                    </St.SearchCountBox>
                  )}
                </St.Title>
                <>
                  <St.GridContainer1>
                    {filteredStoreList?.map((store) => (
                      <React.Fragment key={store.id}>
                        {store.isclosed ? (
                          <St.ClosedCard onClick={() => navDetail(store.id)}>
                            <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                            <St.ClosedStoreInfo>
                              <St.CLosed>CLOSED</St.CLosed>
                            </St.ClosedStoreInfo>
                            <St.InfoBox>
                              <div>
                                {store.location.split(' ').slice(0, 1)} {store.location.split(' ').slice(1, 2)}
                                <St.StoreName>{store.title}</St.StoreName>
                                {store.period_start} ~ {store.period_end}
                              </div>
                              <St.DetailBtn>상세보기</St.DetailBtn>
                            </St.InfoBox>
                          </St.ClosedCard>
                        ) : (
                          <St.Card onClick={() => navDetail(store.id)} key={store.id}>
                            <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                            <St.InfoBox>
                              <div>
                                {store.location.split(' ').slice(0, 1)} {store.location.split(' ').slice(1, 2)}
                                <St.StoreName>{store.title}</St.StoreName>
                                {store.period_start} ~ {store.period_end}
                              </div>
                              <St.DetailBtn>상세보기</St.DetailBtn>
                            </St.InfoBox>
                          </St.Card>
                        )}
                      </React.Fragment>
                    ))}
                  </St.GridContainer1>
                </>
              </>
            ) : (
              <div>검색 결과가 없습니다.</div>
            )}
          </div>
        ) : (
          <>
            <div>
              <St.Title>
                <St.H1Tag>인기 팝업스토어는 어떨까요?</St.H1Tag>
              </St.Title>
              <St.GridContainer>
                <St.StyledSlider {...settings}>
                  {popStores?.map((store: Store, index) => (
                    <St.Card key={store.id} onClick={() => navDetail(store.id)}>
                      <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                      <St.InfoBox>
                        <div>
                          {store.location.split(' ').slice(0, 1)} {store.location.split(' ').slice(1, 2)}
                          <St.StoreName>{store.title}</St.StoreName>
                          <St.Period>
                            {' '}
                            {store.period_start} ~ {store.period_end}
                          </St.Period>
                        </div>
                        <St.RankingNumber>
                          {/* <Rank /> */}
                          {`${index + 1} 위`}
                        </St.RankingNumber>
                        <St.DetailBtn>상세보기</St.DetailBtn>
                      </St.InfoBox>
                    </St.Card>
                  ))}
                </St.StyledSlider>
              </St.GridContainer>
              <St.Title>
                <St.H1Tag>최신 팝업스토어를 소개합니다!</St.H1Tag>
              </St.Title>
              <St.GridContainer>
                <St.StyledSlider {...settings}>
                  {latStores?.map((store: Store) => (
                    <St.Card key={store.id} onClick={() => navDetail(store.id)}>
                      <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                      <St.InfoBox>
                        <div>
                          {store.location.split(' ').slice(0, 1)} {store.location.split(' ').slice(1, 2)}
                          <St.StoreName>{store.title}</St.StoreName>
                          <St.Period>
                            {' '}
                            {store.period_start} ~ {store.period_end}
                          </St.Period>
                        </div>
                        <St.RankingNumber>
                          {/* <Rank /> */}
                          NEW
                        </St.RankingNumber>
                        <St.DetailBtn>상세보기</St.DetailBtn>
                      </St.InfoBox>
                    </St.Card>
                  ))}
                </St.StyledSlider>
              </St.GridContainer>{' '}
            </div>
          </>
        )}
      </>
      <St.Ref ref={ref}></St.Ref>
    </St.Container>
  );
};

export default SearchList;
