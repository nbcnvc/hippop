import SearchDefault from './SearchDefault';

import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { SearchModalProps } from '../../../types/props';
import { Store } from '../../../types/types';
import { fetchStoreData } from '../../../api/store';

import { styled } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
  const { pathname } = useLocation();
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
            <ButtonBox>
              <CloseRoundedIcon onClick={closeSearch} />
            </ButtonBox>
            {pathname === '/review' && (
              <Title>
                <TitleLine>리뷰 남기기 :)</TitleLine> - 어떤 팝업스토어를 다녀오셨나요?
              </Title>
            )}
            {pathname === '/mate' && (
              <Title>
                <TitleLine>팝업메이트 구하기 :)</TitleLine> - 어떤 팝업스토어에 가실 예정인가요?
              </Title>
            )}
            {/* 검색 입력창 */}
            <SearchBox>
              <Input
                value={keyword}
                onChange={onChangeKeyword}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    searchButton();
                  }
                }}
                placeholder="팝업스토어를 검색하세요."
              />
              <button className="custom-btn" onClick={searchButton}>
                검색
              </button>
            </SearchBox>
            {/* 검색 결과창 */}
            {result ? (
              <ResultBox>
                {result.length > 0 ? (
                  <>
                    <Comment>{result.length}개의 검색 결과가 있습니다.</Comment>
                    <GridContainer>
                      {result?.map((store) => {
                        return (
                          <Card key={store.id} onClick={() => selectStore(store)}>
                            <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                            <StoreName>{store.title}</StoreName>
                          </Card>
                        );
                      })}
                    </GridContainer>
                  </>
                ) : (
                  <Comment>검색 결과가 없습니다.</Comment>
                )}
              </ResultBox>
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
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 800px;
  height: 720px;
  padding: 20px;
  background-color: #fff;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
  position: relative;

  .custom-btn {
    width: 100px;
    background-color: var(--second-color);
    border-radius: 0 18px 18px 0;
    padding: 8.5px 16px;
    font-size: 14px;
    font-weight: 700;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 20px 25px 25px 25px;
`;

const TitleLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

const Input = styled.input`
  width: 630px;
  height: 32px;
  padding: 2px 15px;
  outline: none;
  border-radius: 18px 0 0 18px;
  border: 2px solid var(--fifth-color);
`;

const ResultBox = styled.div`
  height: 550px;
  margin: 20px;
  overflow: scroll;
`;

const Comment = styled.div`
  font-weight: 600;
  margin: 10px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 두 개의 열 */
  gap: 15px; /* 열 사이의 간격 조정 */
  max-width: 800px; /* 그리드가 너무 넓어지는 것을 제한 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const Card = styled.div`
  width: 230px;
  border-radius: 18px;
  border: 2px solid var(--fifth-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 210px;
  height: 175px;
  margin-top: 10px;
  object-fit: cover;
  border-radius: 10px;
`;

const StoreName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  font-size: 14px;
  font-weight: 500;
  height: 30px;
  padding: 10px 15px;
`;
