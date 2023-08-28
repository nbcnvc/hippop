import Subscribe from './Subscribe';
import Message from '../../message/Message';

import { styled } from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { WriterProps } from '../../../types/props';
import { useCurrentUser } from '../../../store/userStore';

const Writer = ({ writer, postId }: WriterProps) => {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [msgModal, setMsgModal] = useState<boolean>(false);

  const openMsgModal = () => {
    if (!currentUser) {
      return alert('로그인을 해주세요.');
    }
    setMsgModal(true);
  };

  return (
    <>
      <div
        style={{
          width: '1000px',
          border: '1px solid black',
          padding: '10px',
          margin: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          {writer?.avatar_url.startsWith('profile/') ? (
            <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writer?.avatar_url}`} alt="User Avatar" />
          ) : (
            <Img src={writer?.avatar_url} alt="User Avatar" />
          )}
          <div>{writer?.name}</div>
        </div>
        {pathname === `/rdetail/${postId}` && <Subscribe userId={writer?.id} />}
        {pathname === `/mdetail/${postId}` && <button onClick={openMsgModal}>쪽지 보내기</button>}
        {msgModal && <Message msgModal={msgModal} setMsgModal={setMsgModal} writer={writer} />}
      </div>
    </>
  );
};

export default Writer;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;
