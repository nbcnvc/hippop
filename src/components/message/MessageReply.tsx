import React, { useState } from 'react';
// 라이브러리
import { styled } from 'styled-components';
// api
import { sendMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageType } from '../../types/types';
import { MessageReplyProps } from '../../types/props';
// mui
import SendSharpIcon from '@mui/icons-material/SendSharp';

const MessageReply = ({ sendMsgUser, setOpenReply }: MessageReplyProps) => {
  const [body, setBody] = useState<string>('');
  const currentUser = useCurrentUser() ?? { id: '', name: '', avatar_url: '' };

  // 쪽지 보내기 요청
  const sendMessageHandler = async () => {
    if (sendMsgUser) {
      const message: Omit<MessageType, 'from' | 'to' | 'id' | 'created_at'> = {
        sender: currentUser.id ?? '',
        receiver: sendMsgUser.sender,
        body,
        isRead: false,
        isSender: false,
        isReceiver: false
      };

      await sendMessage(message);
    }
  };

  // 쪽지 내용 onChange
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  // 쪽지 보내기 handler
  const handleSendMessage = () => {
    sendMessageHandler();
    alert('쪽지가 성공적으로 전송되었습니다!');
  };

  // 모달 닫기
  const closeReply = () => {
    window.confirm('쪽지보내기 정말 취소하시겠어요?');
    setOpenReply(false);
  };

  return (
    <Container>
      <Wrapper>
        <TopTitle>팝업메이트에게 답장하는 중...</TopTitle>
        <UserInfo>
          <SenderInfoBox>
            {currentUser?.avatar_url && (
              <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser?.avatar_url}`} alt="User Avatar" />
            )}

            <Name>{currentUser?.name}</Name>
          </SenderInfoBox>

          <SendIconBox>
            <SendSharpIcon />
          </SendIconBox>
          <RecieverInfoBox>
            {sendMsgUser?.to.avatar_url && (
              <Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${sendMsgUser?.to.avatar_url}`}
                alt="User Avatar"
              />
            )}

            <Name>{sendMsgUser?.to.name}</Name>
          </RecieverInfoBox>
        </UserInfo>
        <>
          <Form onSubmit={() => handleSendMessage()}>
            <Textarea value={body} onChange={handleBodyChange} placeholder="전달할 내용을 입력해주세요" />
            <ButtonBox>
              <SendBtn>보내기</SendBtn>
              <CancelBtn onClick={closeReply}>취소</CancelBtn>
            </ButtonBox>
          </Form>
        </>
      </Wrapper>
    </Container>
  );
};

export default MessageReply;

const Container = styled.div`
  /* position: absolute;
  z-index: 0; */
  position: fixed;
  z-index: 9;
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
  width: 500px;
  height: 530px;

  border: 3px solid black;
  border-radius: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TopTitle = styled.span`
  margin-bottom: 30px;

  font-size: 20px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 400px;
`;

const SenderInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SendIconBox = styled.div`
  position: absolute;
  top: 20.2%;
  left: 40%;
  width: 100px;
  height: 50px;
  margin-left: -50px;
  /* background-color: #000; */
  color: #333333;
  /* 애니메이션 이름 */
  animation-name: moveRightToLeft; /* 변경된 애니메이션 이름 적용 */
  animation-duration: 2s;
  animation-iteration-count: infinite; /* 무한 반복 */
  animation-direction: alternate;
  animation-fill-mode: forwards;

  @-webkit-keyframes moveRightToLeft {
    0% {
      left: 45%;
    }
    100% {
      left: 65%;
    }
  }
`;

const RecieverInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 10px;
`;

const Textarea = styled.textarea`
  width: 400px;
  height: 200px;

  border: 3px solid black;
  border-radius: 10px;

  padding: 10px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 20px;

  margin-left: 15px;
`;

const ButtonBox = styled.div`
  margin-top: 35px;
  display: flex;
`;

const SendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 144px;
  height: 42px;
  padding: 10px 20px;
  margin-right: 20px;
`;

const CancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 144px;
  height: 42px;
  padding: 10px 20px;
  background-color: white;
  color: black;

  margin-left: 20px;
`;
