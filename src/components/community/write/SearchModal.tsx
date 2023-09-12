import SearchDefault from './SearchDefault';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { SearchModalProps } from '../../../types/props';
import { Store } from '../../../types/types';
import { getStoreData } from '../../../api/store';

import { St } from './style/St.SearchModal';

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
    document.body.style.overflow = 'auto';
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
    queryKey: ['stores', pathname],
    queryFn: () => getStoreData(pathname)
  });

  // 검색 결과 리셋
  const ResetResult = () => {
    setResult(null);
    setKeyword('');
  };

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
      toast.info('검색어를 입력해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
      // alert('검색어를 입력해주세요.');
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
    return <></>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {searchModal && (
        <St.ModalContainer>
          <St.ModalBox>
            <St.ButtonBox>
              <St.XButton onClick={closeSearch} />
            </St.ButtonBox>
            {pathname === '/review' && (
              <St.Title>
                <St.TitleLine>리뷰 남기기 :)</St.TitleLine> - 어떤 팝업스토어를 다녀오셨나요?
              </St.Title>
            )}
            {pathname === '/mate' && (
              <St.Title>
                <St.TitleLine>팝업메이트 구하기 :)</St.TitleLine> - 어떤 팝업스토어에 가실 예정인가요?
              </St.Title>
            )}
            {/* 검색 입력창 */}
            <St.SearchBox>
              <St.Input
                value={keyword}
                onChange={onChangeKeyword}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    searchButton();
                  }
                }}
                placeholder="팝업스토어를 검색하세요."
              />
              <St.ResetButton onClick={ResetResult} />
              <button className="custom-btn" onClick={searchButton}>
                검색
              </button>
            </St.SearchBox>
            {/* 검색 결과창 */}
            {result ? (
              <St.ResultBox>
                {result.length > 0 ? (
                  <>
                    <St.Comment>{result.length}개의 검색 결과가 있습니다.</St.Comment>
                    <St.GridContainer>
                      {result?.map((store) => {
                        return (
                          <St.Card key={store.id} onClick={() => selectStore(store)}>
                            {store.isclosed ? (
                              <>
                                <St.ClosedBox>
                                  <St.Closed>Closed</St.Closed>
                                </St.ClosedBox>
                                <St.CImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                              </>
                            ) : (
                              <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
                            )}
                            <St.StoreName>{store.title}</St.StoreName>
                          </St.Card>
                        );
                      })}
                    </St.GridContainer>
                  </>
                ) : (
                  <St.Comment>검색 결과가 없습니다.</St.Comment>
                )}
              </St.ResultBox>
            ) : (
              <SearchDefault
                setId={setId}
                setTitle={setTitle}
                setSearchModal={setSearchModal}
                setWriteModal={setWriteModal}
              />
            )}
          </St.ModalBox>
        </St.ModalContainer>
      )}
    </>
  );
};

export default SearchModal;
