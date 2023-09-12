// 라이브러리
import shortid from 'shortid';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// zustand store
import { useCurrentUser } from '../../../store/userStore';
// 타입
import { WriterProps } from '../../../types/props';
// 컴포넌트
import Subscribe from './Subscribe';
import Message from '../../message/Message';

// //alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Writer = ({ writer, postId }: WriterProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const [msgModal, setMsgModal] = useState<boolean>(false);
  const openMsgModal = () => {
    if (!currentUser) {
      toast.info('로그인을 해주세요 ! :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
    setMsgModal(true);
  };

  // 프로필로 넘어가기
  const naviProfile = (userId: string | undefined) => {
    navigate(`/yourpage/${shortid.generate()}`, { state: { userId: userId } });
  };

  return (
    <>
      <WriterContainer>
        <ProfileBox>
          {writer?.avatar_url && (
            <Img
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writer?.avatar_url}`}
              alt="User Avatar"
              onClick={() => {
                naviProfile(writer?.id);
              }}
            />
          )}

          <Name>
            <TitleLine
              onClick={() => {
                naviProfile(writer?.id);
              }}
            >
              {writer?.name}
            </TitleLine>
            님이 궁금하시다면?
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

// 미디어 쿼리 세팅
const mediaQuery = (maxWidth: number) => css`
  @media (max-width: ${maxWidth}px) {
    width: 40%;
  }
`;

const WriterContainer = styled.div`
  max-width: 1920px;
  min-width: 744px;
  width: 50%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  border: 2px solid var(--fifth-color);
  border-radius: 14px;
  padding: 10px;

  ${mediaQuery(900)}
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 0 20px;
`;

const TitleLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  font-weight: 600;
`;
