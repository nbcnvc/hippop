import { useQuery } from '@tanstack/react-query';
import { Store } from '../../../types/types';
import { fetchStoreData } from '../../../api/store';
import { fetchStoreIdCount } from '../../../api/bookmark';
import { styled } from 'styled-components';
import { SearchDefaultProps } from '../../../types/props';

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
      return []; // stores가 없을 때는 빈 배열 반환
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
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <ResultBox>
        <Comment>인기 팝업스토어</Comment>
        <GridContainer>
          {popStores?.map((store: Store) => (
            <Card key={store.id} onClick={() => selectStore(store)}>
              <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${store.images[0]}`} />
              <StoreName>{store.title}</StoreName>
            </Card>
          ))}
        </GridContainer>
      </ResultBox>
    </>
  );
};

export default SearchDefault;

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
  /* border: 1.5px solid var(--fifth-color); */
`;

const StoreName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  font-size: 14px;
  font-weight: 500;
  height: 30px;
  margin: 10px 15px;
`;
