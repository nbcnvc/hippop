import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MessageReplyProps } from '../../types/props';
import { useCurrentUser } from '../../store/userStore';
import { MessageType } from '../../types/types';
import { sendMessage } from '../../api/message';

const MessageReply = ({ sendMsgUser, setOpenReply }: MessageReplyProps) => {
  const [body, setBody] = useState<string>('');
  const currentUser = useCurrentUser() ?? { id: '', name: '', avatar_url: '' };

  // 쪽지 보내기 요청
  const sendMessageHandler = async () => {
    if (sendMsgUser) {
      const message: MessageType = {
        sender: currentUser.id,
        reciever: sendMsgUser.sender,
        body,
        isRead: false
      };
      await sendMessage(message);
    }
    console.log('메세지 전송 성공!');
  };

  // 쪽지 내용 onChange
  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  // 쪽지 보내기 handler
  const handleSendMessage = () => {
    sendMessageHandler();
    alert('쪽지가 성공적으로 전송되었습니다!');
  };

  // 모달 닫기
  const closeReply = () => {
    setOpenReply(false);
  };
  return (
    <Container>
      <Wrapper>
        <button onClick={closeReply}>창닫기</button>
        <ProfileBox>
          발신자:
          {currentUser?.avatar_url && currentUser.avatar_url.startsWith('profile/') ? (
            <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser?.avatar_url}`} alt="User Avatar" />
          ) : (
            <>{currentUser && <Img src={currentUser?.avatar_url} alt="User Avatar" />}</>
          )}
          <div>{currentUser?.name}</div>
        </ProfileBox>
        <ProfileBox>
          수신자:
          {sendMsgUser?.avatar_url && sendMsgUser.avatar_url.startsWith('profile/') ? (
            <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${sendMsgUser.avatar_url}`} alt="User Avatar" />
          ) : (
            <>{currentUser && <Img src={sendMsgUser?.avatar_url} alt="User Avatar" />}</>
          )}
          <div>{sendMsgUser?.name}</div>
        </ProfileBox>

        <form onSubmit={() => handleSendMessage()}>
          <Input value={body} onChange={handleBodyChange} placeholder="전달할 내용을 입력해주세요" />
          <button>쪽지 보내기</button>
        </form>
      </Wrapper>
    </Container>
  );
};

export default MessageReply;

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  position: relative;
  overflow: auto;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  width: 472px;

  margin-top: 6px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;

const Input = styled.input`
  width: 470px;
  height: 200px;
  border: 1px solid black;
  margin-top: 6px;
`;
