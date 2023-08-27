import React from 'react';
import { MsgDetailType } from '../../types/props';
import { styled } from 'styled-components';
import { useCurrentUser } from '../../store/userStore';
import moment from 'moment';

const MessageDetail = ({ selectedMessage, setIsClicked, setReplyModal }: MsgDetailType) => {
  const currentUser = useCurrentUser();

  console.log('selectedMessage', selectedMessage);

  // 메세지 상세 닫기
  const closeDetail = () => {
    setIsClicked(false);
  };

  // 답장 모달 오픈
  const clickOpenReply = () => {
    setReplyModal(true);
  };

  return (
    <Container>
      <ProfileBox>
        발신자:
        {selectedMessage?.user?.avatar_url && selectedMessage.user.avatar_url.startsWith('profile/') ? (
          <Img
            src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedMessage.user.avatar_url}`}
            alt="User Avatar"
          />
        ) : (
          <>{currentUser && <Img src={selectedMessage?.user?.avatar_url} alt="User Avatar" />}</>
        )}
        <div>{selectedMessage?.user?.name}</div>
      </ProfileBox>
      <RecieveTime> 받은시간: {moment(selectedMessage?.created_at).format('YYYY-MM-DD HH:mm:ss')}</RecieveTime>
      <BodyBox>{selectedMessage?.body}</BodyBox>
      <button onClick={clickOpenReply}>답장하기</button>
      <button onClick={closeDetail}> 창닫기</button>
    </Container>
  );
};

export default MessageDetail;

const Container = styled.div`
  overflow-y: hidden;
  position: relative;
`;

const ProfileBox = styled.div`
  display: flex;

  align-items: center;
  border: 1px solid black;

  margin-top: 6px;
`;

const RecieveTime = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin-top: 6px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;

const BodyBox = styled.div`
  width: 500px;
  height: 220px;

  border: 1px solid black;

  margin-top: 10px;
`;
