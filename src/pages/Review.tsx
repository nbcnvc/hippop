import Write from '../components/community/write/Write';
import RPosts from '../components/community/main/review/RPosts';
import SearchModal from '../components/community/write/SearchModal';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Store } from '../types/types';
import { useCurrentUser } from '../store/userStore';

import { St } from './style/St.Review';

const Review = () => {
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
      toast.info('로그인 먼저 부탁 드려요~ :X', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    setSearchModal(true);
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);

  return (
    <St.Layout>
      <St.TitleBox>
        <St.Title>힙팝메이트들의 생생한 리뷰들 :)</St.Title>
      </St.TitleBox>
      <St.ButtonBox>
        <St.Button onClick={searcButton}>후기 작성하기</St.Button>
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
      <RPosts />
    </St.Layout>
  );
};

export default Review;
