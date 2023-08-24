import React from 'react';
import { MessageType, sendMessage } from '../../api/message';
import { useCurrentUser } from '../../store/userStore';
import { styled } from 'styled-components';
import { MessageProps } from '../../types/props';

const Message = ({ userId, setMsgModal, msgModal }: MessageProps) => {
  const currentUser = useCurrentUser() ?? { id: '' };

  const sendMessageHandler = async () => {
    const message: MessageType = {
      sender: currentUser.id,
      reciever: userId,
      body: '이번주 전시 ㄱㄱ?',
      isRead: false
    };

    await sendMessage(message);
    console.log('메세지 전송 성공!');
  };

  const closeMsgModal = () => {
    setMsgModal(false);
  };

  const handleSendMessage = () => {
    sendMessageHandler();
  };

  return (
    <>
      {msgModal ? (
        <Container>
          <Wrapper>
            <button onClick={closeMsgModal}>닫기</button>
            <button onClick={handleSendMessage}>쪽지 보내기</button>
          </Wrapper>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default Message;

const Container = styled.div`
  position: fixed;
  z-index: 0;
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
  position: relative;
  background-color: white;
`;
