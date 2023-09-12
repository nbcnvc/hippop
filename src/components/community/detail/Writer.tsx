import Subscribe from './Subscribe';
import Message from '../../message/Message';

import shortid from 'shortid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { WriterProps } from '../../../types/props';
import { useCurrentUser } from '../../../store/userStore';

import { St } from './style/St.Writer';

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
      <St.WriterContainer>
        <St.ProfileBox>
          {writer?.avatar_url && (
            <St.Img
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writer?.avatar_url}`}
              alt="User Avatar"
              onClick={() => {
                naviProfile(writer?.id);
              }}
            />
          )}

          <St.Name>
            <St.TitleLine
              onClick={() => {
                naviProfile(writer?.id);
              }}
            >
              {writer?.name}
            </St.TitleLine>
            님이 궁금하시다면?
          </St.Name>
        </St.ProfileBox>
        {writer && (
          <St.ButtonBox>
            {pathname === `/rdetail/${postId}` && <Subscribe writerId={writer.id} />}
            {pathname === `/mdetail/${postId}` && currentUserId !== writer.id && (
              <St.Button onClick={openMsgModal}>쪽지 보내기</St.Button>
            )}
          </St.ButtonBox>
        )}
        {msgModal && <Message msgModal={msgModal} setMsgModal={setMsgModal} writer={writer} />}
      </St.WriterContainer>
    </>
  );
};

export default Writer;
