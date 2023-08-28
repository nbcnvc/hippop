import React, { useState } from 'react';
import { MessageType } from '../../types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mySendMessage } from '../../api/message';
import { useCurrentUser } from '../../store/userStore';
import { SendBoxProps } from '../../types/props';
import { styled } from 'styled-components';
import moment from 'moment';
import MessageDetail from './MessageDetail';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
const SendBox = ({ setSendMsgUser, setReplyModal, toggleMsgBox }: SendBoxProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);

  const currentUser = useCurrentUser();
  const userId = currentUser?.id ?? '';

  const {
    data: messages,
    isLoading,
    isError
  } = useQuery<MessageType[] | null>({
    queryKey: ['sendMessage'],
    queryFn: () => mySendMessage(userId)
    // enabled: !!currentUser
  });

  console.log('SendMessage', messages);

  // // 읽은 메세지 mutation
  // const readMessageMutation = useMutation((messageId: number) => readSendMessage(messageId), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['sendMessage']);
  //   }
  // });

  // 메세지 클릭 handler
  const handleClickMsg = (message: MessageType) => {
    setIsClicked(true);
    setSelectedMessage(message);
    setSendMsgUser(message);
  };

  // 메세지 최신순 정렬과 안읽은 메세지 우선 정렬
  const sortedMessages = messages?.sort((a, b) => {
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
    <Container>
      {isClicked ? (
        <MessageDetail
          toggleMsgBox={toggleMsgBox}
          setReplyModal={setReplyModal}
          selectedMessage={selectedMessage}
          setIsClicked={setIsClicked}
        />
      ) : (
        <>
          {sortedMessages?.map((message) => {
            return (
              <Wrapper key={message.sender} onClick={() => handleClickMsg(message)}>
                <ProfileBox>
                  {message.user?.avatar_url && message.user?.avatar_url.startsWith('profile/') ? (
                    <Img
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${message.user.avatar_url}`}
                      alt="User Avatar"
                    />
                  ) : (
                    <>{currentUser && <Img src={message.user?.avatar_url} alt="User Avatar" />}</>
                  )}
                  <div>{message.user?.name}</div>
                </ProfileBox>
                <div> {moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div> {message.isRead ? <div>상대방이 읽었습니다.</div> : <div>상대방이 읽지 않았습니다.</div>}</div>
                <div>{message.isRead ? <DraftsOutlinedIcon /> : <EmailOutlinedIcon />}</div>
              </Wrapper>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default SendBox;

const Container = styled.div`
  position: relative;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  width: 490px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  border: 1px solid black;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;
