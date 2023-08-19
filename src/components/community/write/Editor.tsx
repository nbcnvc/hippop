import React, { useRef } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { EditorProps } from '../../../types/props';
import { randomFileName } from '../../../hooks/useHandleImageName';
import { supabase } from '../../../api/supabase';

const Editor = ({ setBody }: EditorProps) => {
  // 에디터 접근을 위한 ref return
  const quillRef = useRef<ReactQuill | null>(null);

  // 이미지 업로드 핸들러
  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.click();

    input.addEventListener('change', async () => {
      if (input.files) {
        const file = input.files[0];

        try {
          const fileName = randomFileName(file.name);
          const renamedFile = new File([file], fileName);

          const { data } = await supabase.storage.from('images').upload(`post/${renamedFile.name}`, renamedFile);

          if (data) {
            // 업로드 성공 시 이미지 URL을 받아옴
            const imageUrl = data.path;

            const editor = quillRef.current?.getEditor();
            if (editor) {
              const range = editor.getSelection();
              // 받아온 이미지 URL 에디터에 넣어줌
              editor.insertEmbed(
                range?.index || 0,
                'image',
                `${process.env.REACT_APP_SUPABASE_STORAGE_URL}${imageUrl}`
              );
              // 업로드된 이미지 바로 다음으로 커서를 위치
              editor.setSelection((range?.index || 0) + 1, 0);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // 에디터 설정
  const modules = React.useMemo(
    () => ({
      // 툴바 설정
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // 리스트, 인덴트 설정
          ['link', 'image'], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
          ['clean'] // toolbar 설정 초기화 설정
        ],

        // 핸들러 설정
        handlers: {
          image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
        }
      }
    }),
    []
  );

  // 툴바에 사용되는 툴 포맷
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background'
  ];

  return (
    <>
      <ReactQuill
        style={{ width: '650px', height: '650px' }}
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요."
        onChange={setBody}
      />
    </>
  );
};

export default Editor;
