import Write from '../write/Write';
import Posts from './Posts';
import Detail from '../detail/Detail';
import SearchModal from '../write/SearchModal';

import { useState } from 'react';

import { Post, Store } from '../../../types/types';
import { useCurrentUser } from '../../../store/userStore';
import Message from '../../message/Message';

const Main = () => {
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [writeModal, setWriteModal] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<number>(0);
  const [storeTitle, setStoreTitle] = useState<string>('');
  const [result, setResult] = useState<Store[] | null>(null);
  const [msgModal, setMsgModal] = useState<boolean>(false);

  const [openDetail, setOpenDetail] = useState<boolean>(false);
  console.log('opendetail1', openDetail);
  console.log('detailPost', detailPost);
  const currentUser = useCurrentUser();

  const openPost = () => {
    setOpenDetail(true);
  };

  // 검색 모달 열기
  const searcButton = () => {
    if (!currentUser) {
      return alert('로그인 해주세요.');
    }
    setSearchModal(true);
  };

  let userId = '';
  if (detailPost) {
    userId = detailPost.user_id;
  }

  return (
    <>
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
      <div onClick={openPost}>
        <Posts setPost={setDetailPost} />
      </div>

      {openDetail && (
        <>
          <Detail
            openDetail={openDetail}
            post={detailPost}
            setPost={setDetailPost}
            setOpenDetail={setOpenDetail}
            msgModal={msgModal}
            setMsgModal={setMsgModal}
          />
        </>
      )}
      {msgModal && <Message userId={userId} msgModal={msgModal} setMsgModal={setMsgModal} />}
    </>
  );
};

export default Main;
