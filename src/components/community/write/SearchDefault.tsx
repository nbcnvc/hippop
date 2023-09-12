import { useQuery } from '@tanstack/react-query';

import { Store } from '../../../types/types';
import { SearchDefaultProps } from '../../../types/props';
import { fetchStoreData } from '../../../api/store';
import { fetchStoreIdCount } from '../../../api/bookmark';

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

  // 팝업스토어 전체 조회
  const {
    data: stores,
    isLoading,
    isError
  } = useQuery<Store[]>({
    queryKey: ['storeData'],
    queryFn: () => fetchStoreData()
  });

  // 북마크 카운트를 가져오는 함수
  const fetchBookmarkCounts = async () => {
    const storeIds = stores?.map((store) => store.id);
    if (!storeIds) {
      return [];
    }
    // storeIds 배열에 있는 각 스토어 id를 순회하면서 fetchCount를 실행하고
    // 각 스토어의 북마크 카운트를 가져와서 객체 형태로 배열에 저장
    const countsPromises = storeIds?.map(async (store_id) => {
      const count = await fetchStoreIdCount(store_id);
      return { store_id, count };
    });
    // Promise.all
    // 배열에 담긴 모든 비동기 작업이 완료 될떄까지 대기하고, 완료되면 모든 결과를 배열로 반환
    const bookmarkCounts = await Promise.all(countsPromises);
    return bookmarkCounts;
  };

  // 컴포넌트가 마운트되거나 stores 변경될 때 북마크 카운트를 가져옴
  const { data: bookMarkCounts } = useQuery(['bookMarkCounts', stores], fetchBookmarkCounts);

  // 북마크 카운트가 많은 순으로 store_id를 정렬
  const sortedCounts = bookMarkCounts
    ? (bookMarkCounts as { store_id: number; count: number }[]).sort((a, b) => b.count - a.count)
    : [];

  // 정렬된 store id의 배열
  const sortedStoreIds = sortedCounts.map((item) => item.store_id);

  // 인기순(북마크 많은 순) 정렬된 storeData
  const sortedStores = stores
    ? [...stores].sort((a, b) => {
        const indexA = sortedStoreIds.indexOf(a.id);
        const indexB = sortedStoreIds.indexOf(b.id);

        return indexA - indexB;
      })
    : [];

  // 인기 팝업스토어 자르기
  const popStores = sortedStores?.slice(0, 6);

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
