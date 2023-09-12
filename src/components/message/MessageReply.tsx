import React, { useState } from 'react';
// 라이브러리
// api
import { sendMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageType } from '../../types/types';
import { MessageReplyProps } from '../../types/props';
// mui
import SendSharpIcon from '@mui/icons-material/SendSharp';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// style
import { St } from './style/St.MessageReply';

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
    toast.info('쪽지가 성공적으로 전송되었습니다 ! :)', {
      className: 'custom-toast',
      theme: 'light'
    });
  };

  // 모달 닫기
  const closeReply = () => {
    window.confirm('쪽지보내기 정말 취소하시겠어요?');
    setOpenReply(false);
  };

  return (
    <St.Container>
      <St.Wrapper>
        <St.TopTitle>팝업메이트에게 답장하는 중...</St.TopTitle>
        <St.UserInfo>
          <St.SenderInfoBox>
            {currentUser?.avatar_url && (
              <St.Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${currentUser?.avatar_url}`}
                alt="User Avatar"
              />
            )}

            <St.Name>{currentUser?.name}</St.Name>
          </St.SenderInfoBox>

          <St.SendIconBox>
            <SendSharpIcon />
          </St.SendIconBox>
          <St.RecieverInfoBox>
            {sendMsgUser?.to.avatar_url && (
              <St.Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${sendMsgUser?.to.avatar_url}`}
                alt="User Avatar"
              />
            )}

            <St.Name>{sendMsgUser?.to.name}</St.Name>
          </St.RecieverInfoBox>
        </St.UserInfo>
        <>
          <St.Form onSubmit={() => handleSendMessage()}>
            <St.Textarea value={body} onChange={handleBodyChange} placeholder="전달할 내용을 입력해주세요" />
            <St.ButtonBox>
              <St.SendBtn>보내기</St.SendBtn>
              <St.CancelBtn onClick={closeReply}>취소</St.CancelBtn>
            </St.ButtonBox>
          </St.Form>
        </>
      </St.Wrapper>
    </St.Container>
  );
};

export default MessageReply;
