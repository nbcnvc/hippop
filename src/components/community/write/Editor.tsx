import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useState } from 'react';

const Editor = () => {
  // 게시글 본문
  const [body, setBody] = useState<string>('');
  console.log(body);
  return (
    <div style={{ width: '500px' }}>
      <ReactQuill onChange={setBody} />
    </div>
  );
};

export default Editor;
