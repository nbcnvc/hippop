import React from 'react';
// 라이브러리
import moment from 'moment';
// zustand 상태관리 hook
import { useCurrentUser } from '../../store/userStore';
// 타입
import { MsgDetailType } from '../../types/props';
// 스타일
import { styled } from 'styled-components';

const MessageDetail = ({ selectedMessage, setIsClicked, setReplyModal, toggleMsgBox }: MsgDetailType) => {
  const currentUser = useCurrentUser();

  // 메세지 상세 닫기
  const closeDetail = () => {
    setIsClicked(false);
  };

  // 답장 모달 오픈
  const clickOpenReply = () => {
    setReplyModal(true);
  };

  return (
    <Container>
      <div className="header-wrapper">
        {toggleMsgBox === '받은 쪽지함' ? (
          <ProfileBox>
            {toggleMsgBox === '받은 쪽지함' ? '' : ''}
            {selectedMessage?.to.avatar_url && selectedMessage.to.avatar_url.startsWith('profile/') ? (
              <Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedMessage.to.avatar_url}`}
                alt="User Avatar"
              />
            ) : (
              <>{currentUser && <Img src={selectedMessage?.to.avatar_url} alt="User Avatar" />}</>
            )}
            <h4>{selectedMessage?.to.name}</h4>
          </ProfileBox>
        ) : (
          <ProfileBox>
            {toggleMsgBox === '받은 쪽지함' ? '' : '수신자'}
            {selectedMessage?.to.avatar_url && selectedMessage.to.avatar_url.startsWith('profile/') ? (
              <Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedMessage.to.avatar_url}`}
                alt="User Avatar"
              />
            ) : (
              <>{currentUser && <Img src={selectedMessage?.to.avatar_url} alt="User Avatar" />}</>
            )}
            <h4>{selectedMessage?.to.name}</h4>
          </ProfileBox>
        )}

        <RecieveTime> 받은시간: {moment(selectedMessage?.created_at).format('YYYY-MM-DD HH:mm:ss')}</RecieveTime>
      </div>
      <div className="boxBtn-wrapper">
        <BodyBox>{selectedMessage?.body}</BodyBox>
        <span>
          {toggleMsgBox === '받은 쪽지함' ? <button onClick={clickOpenReply}>답장하기</button> : <div></div>}
          <button onClick={closeDetail}> 창닫기</button>
        </span>
      </div>
    </Container>
  );
};

export default MessageDetail;

const Container = styled.div`
  overflow-y: hidden;
  position: relative;
  width: 98.6%;
  margin: 0 auto;

  .header-wrapper {
    padding: 10px;
    display: flex;
    background-color: var(--fourth-color);
    border-radius: 14px;
    h4 {
      margin-left: 6px;
    }
  }

  .boxBtn-wrapper {
    display: flex;

    span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: auto;
      margin-left: 40px;
    }
  }
  button {
    border-radius: 20px;
    padding: 10px 0px 30px;

    &:last-child {
      margin: 8px 0 0;
    }
  }
`;

const ProfileBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  margin-top: 6px;
`;

const RecieveTime = styled.div`
  width: 50%;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const BodyBox = styled.div`
  background-color: var(--fourth-color);
  border-radius: 14px;
  padding: 10px;
  width: 620px;
  height: 143px;
  margin-top: 10px;
`;
