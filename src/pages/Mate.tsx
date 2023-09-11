import { useState } from 'react';
// 라이브러리
import { styled } from 'styled-components';
// 타입
import { Store } from '../types/types';
// 컴포넌트
import MPosts from '../components/community/main/mate/MPosts';
import Write from '../components/community/write/Write';
import SearchModal from '../components/community/write/SearchModal';
// zustand
import { useCurrentUser } from '../store/userStore';

//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <Layout>
      <TitleBox>
        <Title>같이 팝업스토어 가실 분! XD</Title>
      </TitleBox>
      <ButtonBox>
        <Button onClick={searcButton}>팝업메이트 찾기</Button>
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
      <MPosts />
    </Layout>
  );
};

export default Mate;

const Layout = styled.div`
  min-width: 744px;
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
  margin: 70px 0 20px 0;
  padding-bottom: 5px;
`;

const ButtonBox = styled.div`
  min-width: 744px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  font-weight: 700;
  margin-bottom: 80px;
`;
