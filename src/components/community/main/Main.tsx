import Write from '../write/Write';
import Posts from './Posts';
import Detail from '../detail/Detail';
import SearchModal from '../write/SearchModal';

import { useState } from 'react';

import { Post } from '../../../types/types';

const Main = () => {
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [writeModal, setWriteModal] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<boolean>(false);

  // 검색 모달 열기
  const searcButton = () => {
    setSearchModal(true);
  };
  return (
    <>
      <button onClick={searcButton}>글 작성</button>
      <SearchModal setWriteModal={setWriteModal} searchModal={searchModal} setSearchModal={setSearchModal} />
      <Write
        writeModal={writeModal}
        setWriteModal={setWriteModal}
        setSearchModal={setSearchModal}
        setPost={setDetailPost}
      />
      <Posts setPost={setDetailPost} />
      {detailPost ? <Detail post={detailPost} setPost={setDetailPost} /> : <></>}
    </>
  );
};

export default Main;
