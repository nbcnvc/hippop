import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { SearchModalProps } from '../../../types/props';
import { Store } from '../../../types/types';
import { fetchStoreData } from '../../../api/store';
import SearchDefault from './SearchDefault';
import { useEffect } from 'react';

const SearchModal = ({
  keyword,
  setKeyword,
  setWriteModal,
  searchModal,
  setSearchModal,
  setId,
  setTitle,
  result,
  setResult
}: SearchModalProps) => {
  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 닫기: 검색 모달창 닫기
  const closeSearch = () => {
    setKeyword('');
    setSearchModal(false);
    // 검색 결과가 있을 경우 검색 결과 초기화
    if (result) {
      setResult(null);
    }
  };

  // 팝업스토어 전체 조회
  const {
    data: stores,
    isLoading,
    isError
  } = useQuery<Store[]>({
    queryKey: ['storeData'],
    queryFn: () => fetchStoreData()
  });

  // 팝업스토어 선택
  const selectStore = (store: Store) => {
    // 스토어 아이디 set 해주기
    setId(store.id);
    setTitle(store.title);
    // 검색 결과 초기화
    setResult(null);
    // 팝업스토어 선택 완료 후 검색 모달창 닫고 글 작성 모달창 열기
    setSearchModal(false);
    setWriteModal(true);
  };

  // 팝업스토어 검색
  const searchButton = () => {
    // 유효성 검사
    if (!keyword) {
      return alert('검색어를 입력해주세요.');
    }
    // 검색 로직
    if (keyword) {
      const results = stores?.filter((store) => {
        const lowerKeyword = keyword.toLowerCase();
        return store.title.toLowerCase().includes(lowerKeyword);
      });
      // 검색 결과 set 해주기
      if (results) {
        setResult(results);
      }
    }
    // 입력값 초기화
    setKeyword('');
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {searchModal && (
        <ModalContainer>
          <ModalBox>
            <h1>팝업스토어 검색 모달입니다.</h1>
            <button onClick={closeSearch}>닫기</button>
            {/* 검색 입력창 */}
            <div style={{ width: '95%', border: '1px solid black', padding: '20px' }}>
              <div>어떤 팝업스토어를 찾으시나요?</div>
              <input
                value={keyword}
                onChange={onChangeKeyword}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    searchButton();
                  }
                }}
                placeholder="팝업스토어를 검색하세요."
                style={{ width: '30%' }}
              />
              <button className="custom-btn" onClick={searchButton}>
                검색
              </button>
            </div>
            {/* 검색 결과창 */}
            {result ? (
              <div style={{ width: '95%', border: '1px solid black', padding: '20px' }}>
                <h1>검색 결과입니다.</h1>
                {result.length > 0 ? (
                  <GridContainer>
                    {result?.map((store) => {
                      return (
                        <div key={store.id} onClick={() => selectStore(store)}>
                          <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                          <div>{store.title}</div>
                        </div>
                      );
                    })}
                  </GridContainer>
                ) : (
                  <div>검색 결과가 없습니다.</div>
                )}
              </div>
            ) : (
              <SearchDefault
                setId={setId}
                setTitle={setTitle}
                setSearchModal={setSearchModal}
                setWriteModal={setWriteModal}
              />
            )}
          </ModalBox>
        </ModalContainer>
      )}
    </>
  );
};

export default SearchModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const ModalBox = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 800px;
  height: 800px;
  border-radius: 10px;
  position: relative;

  .custom-btn {
    background-color: var(--second-color);
    border-radius: 0 18px 18px 0;
    padding: 4px 16px;
    font-size: 12px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 두 개의 열 */
  gap: 10px; /* 열 사이의 간격 조정 */
  max-width: 800px; /* 그리드가 너무 넓어지는 것을 제한 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const Img = styled.img`
  width: 180px;
  height: 220px;
  object-fit: cover;
`;
