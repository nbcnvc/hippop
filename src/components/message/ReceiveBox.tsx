import React, { useState } from 'react';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
// api
import { deleteReceiveMessage, readMessage, receiveMessage } from '../../api/message';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MessageType } from '../../types/types';
import { SendBoxProps } from '../../types/props';
// 컴포넌트
import MessageDetail from './MessageDetail';
// style
import { styled } from 'styled-components';
// mui
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

const ReceiveBox = ({ setSendMsgUser, setReplyModal, toggleMsgBox }: SendBoxProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const [isReceiver, setIsReceiver] = useState<boolean>(false);

  // 현재 로그인 유저 정보
  const currentUser = useCurrentUser();
  const userId = currentUser?.id ?? '';

  const queryClient = useQueryClient();

  // 로그인한 currentUser의 id에 해당하는 message 전체 조회
  const {
    data: receiveMessages,
    isLoading,
    isError
  } = useQuery<MessageType[] | null>({
    queryKey: ['receiveMessage'],
    queryFn: () => receiveMessage(userId)
    // enabled: !!currentUser
  });

  // 읽은 메세지 mutation
  const readMessageMutation = useMutation((messageId: number) => readMessage(messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['receiveMessage']);
    }
  });

  // 메세지 삭제 mutation
  const deleteMessageMutation = useMutation((messageId: number) => deleteReceiveMessage(messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['receiveMessage']);
    }
  });

  // 메세지 isRead 업데이트 handler
  const handleClickMsg = (message: MessageType) => {
    if (message && !message.isRead) {
      readMessageMutation.mutate(message.id ?? 0);
    }
    setSelectedMessage(message);
    setSendMsgUser(message);
  };

  // 메세지 상세 handler
  const handleShowDetail = () => {
    setIsClicked(true);
  };

  // 메세지 삭제 handler => isReceiver를 true로 업데이트해줌
  const handleDeleteMsg = (message: MessageType) => {
    if (window.confirm('받은 쪽지를 삭제하시겠습니까?')) {
      deleteMessageMutation.mutate(message.id ?? 0);
    }
  };

  // 메세지 최신순 정렬과 안읽은 메세지 우선 정렬
  const sortedMessages = receiveMessages?.sort((a, b) => {
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
                    {message?.to.avatar_url && (
                      <Img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${message.to.avatar_url}`}
                        alt="User Avatar"
                      />
                    )}

                    <h4>{message.to.name}</h4>
                  </ProfileBox>
                  <p>{moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <Body>{message.isRead ? <span>{message.body}</span> : <span>읽지 않은 메세지입니다..</span>}</Body>
                </div>
                <section>{message.isRead ? <DraftsOutlinedIcon /> : <EmailOutlinedIcon />}</section>
                <button className="deletBtn" onClick={() => handleDeleteMsg(message)} style={{ width: '60px' }}>
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

export default ReceiveBox;

const Container = styled.div`
  position: relative;
  overflow-y: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  background-color: var(--fourth-color);
  align-items: center;
  width: 99%;
  height: 50px;
  // padding-right: 8px;
  border-radius: 14px;
  margin: 6px 0 0;
  color: var(--fifth-color);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, padding-right 0.3s ease;
  &:hover {
    // padding-right: 0px;
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
    width: 180px;
    text-align: center;
  }
  .deletBtn {
    width: 60px;
    height: 50px !important;
    font-size: 14px;
    border-radius: 0 14px 14px 0;
    border-bottom: 4px solid var(--fifth-color);
  }
  p {
    width: 160px;
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

const Body = styled.div`
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  span {
    display: inline-block;
    animation: marquee 7s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
