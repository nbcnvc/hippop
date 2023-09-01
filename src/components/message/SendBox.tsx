import React, { useState } from 'react';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
// api
import { deleteMessage, mySendMessage, readMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageType } from '../../types/types';
import { SendBoxProps } from '../../types/props';
// 컴포넌트
import MessageDetail from './MessageDetail';
// 스타일
import { styled } from 'styled-components';
// mui
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

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
  const deleteMessageMutation = useMutation((messageId: number) => deleteMessage(messageId), {
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

  // 메세지 삭제 handler
  const handleDeleteMsg = (message: MessageType) => {
    if (window.confirm('받은 쪽지를 삭제하시겠습니까?')) {
      deleteMessageMutation.mutate(message.id ?? 0);
    } else {
      alert('삭제를 취소하겠습니다.');
    }
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
              <Wrapper key={message.id} onClick={() => handleClickMsg(message)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} onClick={handleShowDetail}>
                  <ProfileBox>
                    {message?.to.avatar_url && message?.to.avatar_url.startsWith('profile/') ? (
                      <Img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${message.to.avatar_url}`}
                        alt="User Avatar"
                      />
                    ) : (
                      <>{currentUser && <Img src={message.to.avatar_url} alt="User Avatar" />}</>
                    )}
                    <h4>{message.to.name}</h4>
                  </ProfileBox>
                  <p> {moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <div>
                    {' '}
                    {message.isRead ? <span>상대방이 읽었습니다.</span> : <span>상대방이 읽지 않았습니다.</span>}
                  </div>
                </div>
                <h5>{message.isRead ? <DraftsOutlinedIcon /> : <EmailOutlinedIcon />}</h5>
                <button className="deleBtn" onClick={() => handleDeleteMsg(message)} style={{ width: '50px' }}>
                  삭제
                </button>
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
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--fourth-color);
  align-items: center;
  height: 50px;
  padding-right: 8px;
  border-radius: 14px;
  margin: 6px 0 0;
  color: var(--fifth-color);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, padding-right 0.3s ease;
  &:hover {
    padding-right: 0px;
    background-color: var(--sixth-color);
  }
  &:active {
    transform: scale(0.988);
  }
  h4 {
    margin-left: 8px;
    width: 100px;
    text-align: center;
  }
  span {
    display: block;
    width: 200px;
    text-align: center;
  }
  .deleBtn {
    height: 50px !important;
    font-size: 14px;
    border-radius: 0 14px 14px 0;
    border-bottom: 4px solid var(--fifth-color);
  }
  p {
    width: 200px;
    text-align: center;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  margin-left: 10px;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;
