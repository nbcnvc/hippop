import React, { useState } from 'react';
// 라이브러리
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// api
import { fetchAllBookMark } from '../../api/bookmark';
import { fetchStoreData } from '../../api/store';
// 타입
import { Store } from '../../types/types';
// 스타일
import { styled } from 'styled-components';
// mui 아이콘
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import SearchIcon from '@mui/icons-material/Search';

function SearchHeader() {
  // 네비게이트
  const navigate = useNavigate();
  const [isSearchModal, setIsSearchModal] = useState<Boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 북마크 전체 조회
  const { data: bookMark } = useQuery(['bookMark'], () => fetchAllBookMark());

  // store 전체 데이터 조회
  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store[] | null>({ queryKey: ['storeData'], queryFn: () => fetchStoreData() });

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

  const navDetail = (id: number) => {
    navigate(`/detail/${id}`);
    setIsSearchModal(false);
  };

  // 모달 오픈
  const openSearchModal = () => {
    setIsSearchModal(true);
  };

  // 모달 닫기
  const closeSearchModal = () => {
    setIsSearchModal(false);
  };

  const performSearch = () => {
    // 검색어를 파라미터로하여 검색 페이지로 이동
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsSearchModal(false);
    setSearchQuery('');
  };

  if (isError) {
    alert('error');
  }

  if (isLoading) {
    return <Input onClick={openSearchModal} placeholder="Search" />;
  }

  const topStores = sortedStores?.slice(0, 4);

  return (
    <SearchModal>
      <SearchIcon onClick={openSearchModal} />
      {/* {isSearchModal ? <div></div> : <Input placeholder="Search" />} */}
      {isSearchModal && (
        <SearchContainer>
          <SearchWrapper>
            <SearchBox>
              <CloseButton onClick={closeSearchModal}>
                <CloseTwoToneIcon />
              </CloseButton>
              <ModalInputBox>
                <Search onClick={performSearch} />
                <ModalInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      performSearch();
                    }
                  }}
                  placeholder="팝업스토어를 검색해보세요!"
                />
              </ModalInputBox>

              <ImgContainer>
                {topStores?.map((store) => (
                  <ImgWrapper key={store.id} onClick={() => navDetail(store.id)}>
                    <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                    <PopupTitle> {store.title}</PopupTitle>
                  </ImgWrapper>
                ))}
              </ImgContainer>
            </SearchBox>
          </SearchWrapper>
        </SearchContainer>
      )}
    </SearchModal>
  );
}

export default SearchHeader;

const SearchModal = styled.div`
  position: relative;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 11%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const SearchWrapper = styled.div`
  background-color: white;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 150px;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 2%;

  border: none;
  background: none;

  font-size: 1.5em;

  cursor: pointer;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 10px;
  box-shadow: 1px;
`;

const ModalInputBox = styled.div`
  position: relative;

  margin-top: 50px;
`;

const Search = styled(SearchIcon)`
  position: absolute;

  top: 30%;
`;

const ModalInput = styled.input`
  width: 450px;
  height: 50px;

  box-shadow: 1px;

  border: none;
  border-bottom: 2px solid black;

  outline: none;

  padding-left: 35px;
`;

const ImgContainer = styled.div`
  display: flex;

  margin-top: 40px;
`;

const ImgWrapper = styled.div`
  margin-right: 30px;

  cursor: pointer;
`;

const Img = styled.img`
  width: 270px;
  height: 330px;

  object-fit: cover;
`;

const PopupTitle = styled.div`
  margin-top: 15px;

  font-weight: bold;
`;
