import React, { useState } from 'react';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
// api
import { deleteSendMessage, mySendMessage, readMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageType } from '../../types/types';
import { SendBoxProps } from '../../types/props';
// 컴포넌트
import MessageDetail from './MessageDetail';
// mui
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
// style
import { St } from './style/St.SendBox';
const SendBox = ({ setSendMsgUser, setReplyModal, toggleMsgBox }: SendBoxProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const currentUser = useCurrentUser();
  const userId = currentUser?.id ?? '';

  const queryClient = useQueryClient();

  const {
    data: sendMessages,
    isLoading,
    isError
  } = useQuery<MessageType[] | null>({
    queryKey: ['sendMessage'],
    queryFn: () => mySendMessage(userId),
    enabled: !!currentUser
  });

  // 읽은 메세지 mutation
  const readMessageMutation = useMutation((messageId: number) => readMessage(messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['sendMessage']);
    }
  });

  // 메세지 삭제 mutation
  const deleteMessageMutation = useMutation((messageId: number) => deleteSendMessage(messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['receiveMessage']);
    }
  });

  // 메세지 isRead 업데이트 handler
  const handleClickMsg = (message: MessageType) => {
    if (message && !message.isRead && message.sender !== currentUser?.id) {
      readMessageMutation.mutate(message.id ?? 0);
    }
    setSelectedMessage(message);
    setSendMsgUser(message);
  };

  // 메세지 상세 handler
  const handleShowDetail = () => {
    setIsClicked(true);
  };

  // 메세지 삭제 handler => isSender를 true로 업데이트해줌
  const handleDeleteMsg = (message: MessageType) => {
    if (window.confirm('보낸 쪽지를 삭제하시겠습니까?')) {
      deleteMessageMutation.mutate(message.id ?? 0);
    }
    return <div>null</div>;
  };

  // 메세지 최신순 정렬과 안읽은 메세지 우선 정렬
  const sortedMessages = sendMessages?.sort((a, b) => {
    // a 메세지가 읽음이고, b의 메세지가 읽지 않음이라면, b메세지를 앞으로 옮김
    if (a.isRead && !b.isRead) {
      return 1;
    }
    // b 메세지가 읽음이고, a의 메세지가 읽지 않음이라면, a메세지를 앞으로 옮김
    if (!a.isRead && b.isRead) {
      return -1;
    }
    // 읽음 상태가 같다면 , created_at 기준으로 내림차순으로 정렬
    return new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime();
  });

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <St.Container>
      {isClicked ? (
        <MessageDetail
          toggleMsgBox={toggleMsgBox}
          setReplyModal={setReplyModal}
          selectedMessage={selectedMessage}
          setIsClicked={setIsClicked}
        />
      ) : (
        <>
          {sortedMessages && sortedMessages?.length > 0 ? (
            <>
              {sortedMessages?.map((message) => {
                return (
                  <St.Wrapper key={message.id} onClick={() => handleClickMsg(message)}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '70%' }}
                      onClick={handleShowDetail}
                    >
                      <St.ProfileBox>
                        {message?.to.avatar_url && (
                          <St.Img
                            src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${message.to.avatar_url}`}
                            alt="User Avatar"
                          />
                        )}
                        <h4>{message.to.name}</h4>
                      </St.ProfileBox>
                      <p> {moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                      <St.Body>
                        <span>{message.body}</span>
                      </St.Body>
                    </div>
                    <h5>{message.isRead ? <DraftsOutlinedIcon /> : <EmailOutlinedIcon />}</h5>
                    <button className="deleteBtn" onClick={() => handleDeleteMsg(message)} style={{ width: '60px' }}>
                      삭제
                    </button>
                  </St.Wrapper>
                );
              })}
            </>
          ) : (
            <St.NullBox> 보낸 쪽지가 없습니다! 쪽지를 보내볼까요? </St.NullBox>
          )}
        </>
      )}
    </St.Container>
  );
};

export default SendBox;
