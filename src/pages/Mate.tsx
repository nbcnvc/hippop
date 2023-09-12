import MPosts from '../components/community/main/mate/MPosts';
import Write from '../components/community/write/Write';
import SearchModal from '../components/community/write/SearchModal';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { St } from './style/St.Mate';
import { Store } from '../types/types';
import { useCurrentUser } from '../store/userStore';

const Mate = () => {
  const [writeModal, setWriteModal] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<number>(0);
  const [storeTitle, setStoreTitle] = useState<string>('');
  const [result, setResult] = useState<Store[] | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const currentUser = useCurrentUser();

  // 검색 모달 열기
  const searcButton = () => {
    if (!currentUser) {
      toast.info('로그인 해주세요. :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    setSearchModal(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <St.Layout>
      <St.TitleBox>
        <St.Title>같이 팝업스토어 가실 분! XD</St.Title>
      </St.TitleBox>
      <St.ButtonBox>
        <St.Button onClick={searcButton}>팝업메이트 찾기</St.Button>
      </St.ButtonBox>
      <SearchModal
        keyword={keyword}
        setKeyword={setKeyword}
        setWriteModal={setWriteModal}
        searchModal={searchModal}
        setSearchModal={setSearchModal}
        setId={setStoreId}
        setTitle={setStoreTitle}
        result={result}
        setResult={setResult}
      />
      <Write
        setKeyword={setKeyword}
        writeModal={writeModal}
        setWriteModal={setWriteModal}
        setSearchModal={setSearchModal}
        storeId={storeId}
        storeTitle={storeTitle}
        setResult={setResult}
      />
      <MPosts />
    </St.Layout>
  );
};

export default Mate;
