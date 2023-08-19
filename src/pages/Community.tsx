import CommMain from '../components/community/main/CommMain';
import Write from '../components/community/write/Write';

import { useState } from 'react';

const Community = () => {
  const [writeModal, setWriteModal] = useState<boolean>(false);

  // 글작성 모달 열기
  const writeButton = () => {
    setWriteModal(true);
  };
  return (
    <>
      <button onClick={writeButton}>글 작성</button>
      <Write writeModal={writeModal} setWriteModal={setWriteModal} />
      <CommMain />
    </>
  );
};

export default Community;
