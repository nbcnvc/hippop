import Posts from './Posts';
import Detail from '../detail/Detail';

import { useState } from 'react';

import { Post } from '../../../types/types';

const Main = () => {
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  return (
    <>
      <Posts setPost={setDetailPost} />
      {detailPost ? <Detail post={detailPost} setPost={setDetailPost} /> : <></>}
    </>
  );
};

export default Main;
