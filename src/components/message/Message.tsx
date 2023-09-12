import React, { useState } from 'react';
// 라이브러리
// api
import { sendMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageProps } from '../../types/props';
import { MessageType } from '../../types/types';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// mui
import SendSharpIcon from '@mui/icons-material/SendSharp';
// style
import { St } from './style/St.Message';

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
    toast.info('쪽지가 성공적으로 전송되었습니다 ! :)', {
      className: 'custom-toast',
      theme: 'light'
    });
  };

  return (
    <>
      {msgModal && (
        <St.Container>
          <St.Wrapper>
            <St.TopTitle>팝업메이트에게 쪽지하는 중...</St.TopTitle>
            <St.UserInfo>
              <St.SenderInfoBox>
                {writer?.avatar_url && (
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
                {writer?.avatar_url && (
                  <St.Img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${writer?.avatar_url}`}
                    alt="User Avatar"
                  />
                )}

                <St.Name>{writer?.name}</St.Name>
              </St.RecieverInfoBox>
            </St.UserInfo>
            <div>
              <St.Title>쪽지 내용</St.Title>
              <St.Form onSubmit={() => handleSendMessage()}>
                <St.Textarea value={body} onChange={handleBodyChange} placeholder="전달할 내용을 입력해주세요" />
                <St.ButtonBox>
                  <St.SendBtn>보내기</St.SendBtn>
                  <St.CancelBtn onClick={closeMsgModal}>취소</St.CancelBtn>
                </St.ButtonBox>
              </St.Form>
            </div>
          </St.Wrapper>
        </St.Container>
      )}
    </>
  );
};

export default Message;
