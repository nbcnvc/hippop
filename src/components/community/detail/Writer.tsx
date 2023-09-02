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
  const currentUserId = currentUser?.id;
  const [msgModal, setMsgModal] = useState<boolean>(false);

  const openMsgModal = () => {
    if (!currentUser) {
      return alert('로그인을 해주세요.');
    }
    setMsgModal(true);
  };

  return (
    <>
      <WriterContainer>
        <ProfileBox>
          {writer?.avatar_url && writer.avatar_url.startsWith('profile/') ? (
            <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writer?.avatar_url}`} alt="User Avatar" />
          ) : (
            <Img src={writer?.avatar_url} alt="User Avatar" />
          )}
          <Name>
            <TitleLine>{writer?.name}</TitleLine>님이 궁금하시다면?
          </Name>
        </ProfileBox>
        {writer && (
          <ButtonBox>
            {pathname === `/rdetail/${postId}` && <Subscribe writerId={writer.id} />}
            {pathname === `/mdetail/${postId}` && currentUserId !== writer.id && (
              <Button onClick={openMsgModal}>쪽지 보내기</Button>
            )}
          </ButtonBox>
        )}
        {msgModal && <Message msgModal={msgModal} setMsgModal={setMsgModal} writer={writer} />}
      </WriterContainer>
    </>
  );
};

export default Writer;

const WriterContainer = styled.div`
  width: 870px;
  display: flex;
  justify-content: space-between;
  border: 2px solid var(--fifth-color);
  border-radius: 14px;
  padding: 10px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 0 20px;
`;

const TitleLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  font-weight: 600;
`;
