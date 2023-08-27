import Posts from '../components/community/main/Posts';
import Write from '../components/community/write/Write';
import SearchModal from '../components/community/write/SearchModal';

import { useState } from 'react';

import { Store } from '../types/types';
import { useCurrentUser } from '../store/userStore';

const Review = () => {
  const [writeModal, setWriteModal] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<number>(0);
  const [storeTitle, setStoreTitle] = useState<string>('');
  const [result, setResult] = useState<Store[] | null>(null);

  const currentUser = useCurrentUser();

  // 검색 모달 열기
  const searcButton = () => {
    if (!currentUser) {
      return alert('로그인 해주세요.');
    }
    setSearchModal(true);
  };

  return (
    <>
      <div style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>Review</div>
      <div style={{ padding: '0 20px 30px 0' }}>
        <button onClick={searcButton} style={{ float: 'right' }}>
          글 작성
        </button>
      </div>
      <SearchModal
        setWriteModal={setWriteModal}
        searchModal={searchModal}
        setSearchModal={setSearchModal}
        setId={setStoreId}
        setTitle={setStoreTitle}
        result={result}
        setResult={setResult}
      />
      <Write
        writeModal={writeModal}
        setWriteModal={setWriteModal}
        setSearchModal={setSearchModal}
        storeId={storeId}
        storeTitle={storeTitle}
        setResult={setResult}
      />
      <Posts />
    </>
  );
};

export default Review;
