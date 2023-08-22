import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../types/types';
import { fetchStoreData } from '../../api/store';

//스타일
import { styled } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAllBookMark } from '../../api/bookmark';

const SearchList = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>('');
  const [filteredStoreList, setFilteredStoreList] = useState<Store[]>([]);

  // 북마크 전체 조회
  const { data: bookMark } = useQuery(['bookMark'], () => fetchAllBookMark());

  // 전체 데이터 조회
  // 옵션을 24시간으로 걸어놓으면 => 비용절감
  const { data: storeData } = useQuery<Store[] | null>({
    queryKey: ['storeData'],
    queryFn: () => fetchStoreData(),
    staleTime: 86400000
  });

  console.log('storeData', storeData);

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

  // 정렬된 storeData
  const sortedStores = storeData?.sort((a, b) => {
    const indexA = sortedStoreIds.indexOf(a.id.toString());
    const indexB = sortedStoreIds.indexOf(b.id.toString());

    return indexA - indexB;
  });

  // 데이터 필터링
  useEffect(() => {
    if (storeData && inputValue) {
      // 소문자로 변환
      const lowercaseInputValue = inputValue.toLowerCase();
      const newFilteredList = storeData.filter(
        (store) =>
          store.title.toLowerCase().includes(lowercaseInputValue) ||
          store.body.toLowerCase().includes(lowercaseInputValue) ||
          store.location.toLowerCase().includes(lowercaseInputValue)
      );
      setFilteredStoreList(newFilteredList);
    } else if (!inputValue && storeData) {
      setFilteredStoreList(storeData);
    } else {
      setFilteredStoreList([]);
    }
  }, [storeData, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // detail page 이동
  const navDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  // 인기 팝업스토어 자르기
  const sliceStores = sortedStores?.slice(0, 3);

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
      {inputValue || !storeData ? (
        <GridContainer>
          {filteredStoreList.map((store) => (
            <GridItem key={store.id} onClick={() => navDetail(store.id)}>
              <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
              <div>{store.title}</div>
            </GridItem>
          ))}
        </GridContainer>
      ) : (
        <>
          <h1>인기 팝업스토어</h1>
          <GridContainer>
            {sliceStores?.map((store) => (
              <ImgWrapper key={store.id} onClick={() => navDetail(store.id)}>
                <PImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                <PopupTitle>{store.title}</PopupTitle>
              </ImgWrapper>
            ))}
          </GridContainer>
          {/* <GridContainer>
            {sliceStores?.map((store) => (
              <ImgWrapper key={store.id} onClick={() => navDetail(store.id)}>
                <PImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                <PopupTitle>{store.title}</PopupTitle>
              </ImgWrapper>
            ))}
          </GridContainer> */}
        </>
      )}
    </Container>
  );
};

export default SearchList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const SearchBox = styled.div`
  position: relative;

  margin-top: 50px;
`;

const Search = styled(SearchIcon)`
  position: absolute;

  top: 25%;
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

const TagTitle = styled.div`
  margin-right: 20px;
  font-weight: bold;
`;

const TagBox = styled.div`
  display: flex;

  margin-top: 20px;
  margin-bottom: 150px;
`;

const Tag = styled.div`
  margin-right: 5px;
`;

// const ImgContainer = styled.div`
//   display: flex;

//   margin-top: 40px;
// `;

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
  width: 270px;
  height: 330px;
  object-fit: cover;
`;
