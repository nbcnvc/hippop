import { useQuery } from '@tanstack/react-query';

import { Store } from '../../../types/types';
import { SearchDefaultProps } from '../../../types/props';
import { fetchPopularStore } from '../../../api/bookmark';

import { St } from './style/St.SearchDefault';

const SearchDefault = ({ setId, setTitle, setSearchModal, setWriteModal }: SearchDefaultProps) => {
  // 팝업스토어 선택
  const selectStore = (store: Store) => {
    // 스토어 아이디 set 해주기
    setId(store.id);
    setTitle(store.title);

    // 팝업스토어 선택 완료 후 검색 모달창 닫고 글 작성 모달창 열기
    setSearchModal(false);
    setWriteModal(true);
  };
  // 인기 팝업스토어 가져오기
  const { data: popularStores, isLoading, isError } = useQuery(['popular'], fetchPopularStore);

  // 인기 팝업스토어 자르기
  const popStores = popularStores?.slice(0, 6);

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <St.ResultBox>
        <St.Comment>인기 팝업스토어</St.Comment>
        <St.GridContainer>
          {popStores?.map((store: Store) => (
            <St.Card key={store.id} onClick={() => selectStore(store)}>
              <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
              <St.StoreName>{store.title}</St.StoreName>
            </St.Card>
          ))}
        </St.GridContainer>
      </St.ResultBox>
    </>
  );
};

export default SearchDefault;
