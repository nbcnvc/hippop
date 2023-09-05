import React, { useState } from 'react';
// 라이브러리
import { styled } from 'styled-components';
// api
import { sendMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageProps } from '../../types/props';
import { MessageType } from '../../types/types';
// mui
import SendSharpIcon from '@mui/icons-material/SendSharp';

const Message = ({ setMsgModal, msgModal, writer }: MessageProps) => {
  const [body, setBody] = useState<string>('');
  const currentUser = useCurrentUser() ?? { id: '', avatar_url: '', name: '' };

  // 쪽지 보내기 요청
  const messageHandler = async () => {
    if (writer) {
      const message: Omit<MessageType, 'from' | 'to' | 'id' | 'created_at'> = {
        sender: currentUser.id ?? '',
        receiver: writer.id ?? '',
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

  // 모달 닫기
  const closeMsgModal = () => {
    window.confirm('쪽지보내기 정말 취소하시겠어요?');
    setMsgModal(false);
  };

  // 쪽지 보내기 handler
  const handleSendMessage = () => {
    messageHandler();
    alert('쪽지가 성공적으로 전송되었습니다!');
  };

  return (
    <>
      {msgModal && (
        <Container>
          <Wrapper>
            <TopTitle>팝업메이트에게 쪽지하는 중...</TopTitle>
            <UserInfo>
              <SenderInfoBox>
                {writer?.avatar_url && (
                  <Img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser?.avatar_url}`}
                    alt="User Avatar"
                  />
                )}

                <Name>{currentUser?.name}</Name>
              </SenderInfoBox>
              <SendIconBox>
                <SendSharpIcon />
              </SendIconBox>
              <RecieverInfoBox>
                {writer?.avatar_url && (
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writer?.avatar_url}`} alt="User Avatar" />
                )}

                <Name>{writer?.name}</Name>
              </RecieverInfoBox>
            </UserInfo>
            <div>
              <Title>쪽지 내용</Title>
              <Form onSubmit={() => handleSendMessage()}>
                <Textarea value={body} onChange={handleBodyChange} placeholder="전달할 내용을 입력해주세요" />
                <ButtonBox>
                  <SendBtn>보내기</SendBtn>
                  <CancelBtn onClick={closeMsgModal}>취소</CancelBtn>
                </ButtonBox>
              </Form>
            </div>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default Message;

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
  top: 18.6%;
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

const Title = styled.span`
  font-weight: bold;
  padding: 13px;
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

  border: 2px solid black;
  border-radius: 18px;

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
