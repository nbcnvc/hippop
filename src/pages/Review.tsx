import RPosts from '../components/community/main/RPosts';
import Write from '../components/community/write/Write';
import SearchModal from '../components/community/write/SearchModal';

import { useState } from 'react';

import { Store } from '../types/types';
import { useCurrentUser } from '../store/userStore';

import { styled } from 'styled-components';

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
      return alert('로그인 해주세요.');
    }
    setSearchModal(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <Layout>
      <TitleBox>
        <Title>힙팝메이트들의 생생한 리뷰들 :)</Title>
      </TitleBox>
      <ButtonBox>
        <Button onClick={searcButton}>후기 작성하기</Button>
      </ButtonBox>
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
    </Layout>
  );
};

export default Review;

const Layout = styled.div`
  min-width: 870px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: var(--fifth-color);
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  margin: 70px;
  padding-bottom: 5px;
`;

const ButtonBox = styled.div`
  min-width: 900px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 700;
  margin-bottom: 5px;
`;
