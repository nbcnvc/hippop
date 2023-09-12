import React from 'react';
// 라이브러리
import moment from 'moment';
// 타입
import { MsgDetailType } from '../../types/props';
// style
import { St } from './style/St.MessageDetail';

const MessageDetail = ({ selectedMessage, setIsClicked, setReplyModal, toggleMsgBox }: MsgDetailType) => {
  // 메세지 상세 닫기
  const closeDetail = () => {
    setIsClicked(false);
  };

  // 답장 모달 오픈
  const clickOpenReply = () => {
    setReplyModal(true);
  };

  return (
    <St.Container>
      <div className="header-wrapper">
        {toggleMsgBox === '받은 쪽지함' ? (
          <St.ProfileBox>
            {toggleMsgBox === '받은 쪽지함' ? '' : ''}
            {selectedMessage?.to.avatar_url && (
              <St.Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedMessage.to.avatar_url}`}
                alt="User Avatar"
              />
            )}

            <h4>{selectedMessage?.to.name}</h4>
          </St.ProfileBox>
        ) : (
          <St.ProfileBox>
            {toggleMsgBox === '받은 쪽지함' ? '' : ''}
            {selectedMessage?.to.avatar_url && (
              <St.Img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${selectedMessage.to.avatar_url}`}
                alt="User Avatar"
              />
            )}

            <h4>{selectedMessage?.to.name}</h4>
          </St.ProfileBox>
        )}

        <St.RecieveTime> 받은시간: {moment(selectedMessage?.created_at).format('YYYY-MM-DD HH:mm:ss')}</St.RecieveTime>
      </div>
      <div className="boxBtn-wrapper">
        <St.BodyBox>{selectedMessage?.body}</St.BodyBox>
        <span>
          {toggleMsgBox === '받은 쪽지함' ? <button onClick={clickOpenReply}>답장하기</button> : <div></div>}
          <button onClick={closeDetail}> 창닫기</button>
        </span>
      </div>
    </St.Container>
  );
};

export default MessageDetail;
