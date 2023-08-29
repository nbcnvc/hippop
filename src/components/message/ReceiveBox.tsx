import React, { useState } from 'react';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
// api
import { deleteMessage, readMessage, receiveMessage } from '../../api/message';
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

  console.log(receiveMessages);

  // 읽은 메세지 mutation
  const readMessageMutation = useMutation((messageId: number) => readMessage(messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['receiveMessage']);
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

  // 메세지 삭제 handler
  const handleDeleteMsg = (message: MessageType) => {
    if (window.confirm('받은 쪽지를 삭제하시겠습니까?')) {
      deleteMessageMutation.mutate(message.id ?? 0);
    } else {
      alert('삭제를 취소하겠습니다.');
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
                    {message?.to.avatar_url && message?.to.avatar_url.startsWith('profile/') ? (
                      <Img
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${message.to.avatar_url}`}
                        alt="User Avatar"
                      />
                    ) : (
                      <>{currentUser && <Img src={message.to.avatar_url} alt="User Avatar" />}</>
                    )}
                    <div>{message.to.name}</div>
                  </ProfileBox>
                  <div> {moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                  <div> {message.isRead ? <div>읽은 메세지입니다..</div> : <div>읽지 않은 메세지입니다..</div>}</div>
                </div>
                <div>{message.isRead ? <DraftsOutlinedIcon /> : <EmailOutlinedIcon />}</div>
                <button onClick={() => handleDeleteMsg(message)} style={{ width: '50px' }}>
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
