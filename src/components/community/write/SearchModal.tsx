import { styled } from 'styled-components';

import { SearchModalProps } from '../../../types/props';

const SearchModal = ({ setWriteModal, searchModal, setSearchModal }: SearchModalProps) => {
  // 검색 모달창 닫기
  const closeSearch = () => {
    setSearchModal(false);
  };

  // 글작성 모달창 열기
  const openWrite = () => {
    setSearchModal(false);
    setWriteModal(true);
  };

  // 팝업스토어 검색
  const searchButton = () => {
    // 검색 모달창 열기
    setSearchModal(true);

    // 검색 로직

    // 검색 모달창 닫고 글 작성 모달창 열기
    setSearchModal(false);
    setWriteModal(true);
  };

  return (
    <>
      {searchModal && (
        <ModalContainer>
          <ModalBox>
            <h1>팝업스토어 검색 모달입니다.</h1>
            <button onClick={closeSearch}>닫기</button>
            <button onClick={openWrite}>다음</button>
            <div>어떤 팝업스토어를 찾으시나요?</div>
            <input />
            <button onClick={searchButton}>검색</button>
          </ModalBox>
        </ModalContainer>
      )}
    </>
  );
};

export default SearchModal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const ModalBox = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 800px;
  height: 800px;
  border-radius: 10px;
  position: relative;
`;
