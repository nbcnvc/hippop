import React from 'react';
// 라이브러리
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정
import shortid from 'shortid';
// api
import { deleteAlarm } from '../../api/alarm';
// zustand
import { useCurrentUser } from '../../store/userStore';
// 타입
import { AlarmType } from '../../types/types';
// 스타일
import { styled } from 'styled-components';
// mui
import DeleteIcon from '@mui/icons-material/Delete';
import { AlarmBoxProps } from '../../types/props';

const AlarmBox = ({ alarms }: AlarmBoxProps) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  // 알람은 무조건 5개만
  const AlarmList = alarms?.slice(0, 5);

  // 시간
  const formatTimeAgo = (createdAt: string) => {
    const now = moment();
    const alarmTime = moment(createdAt);
    const diffInMinutes = now.diff(alarmTime, 'minutes');
    const diffInHours = now.diff(alarmTime, 'hours');
    const diffInDays = now.diff(alarmTime, 'days');

    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return moment(createdAt).format('YYYY.MM.DD HH:mm');
    }
  };

  const queryClient = useQueryClient();

  // 알람 삭제
  const deleteMutation = useMutation(deleteAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(['alarms']);
    }
  });

  const deleteButton = (id: number) => {
    // DB 수정
    deleteMutation.mutate(id);
  };

  // 알람 눌러서 페이지 이동
  const naviAlarm = (alarm: AlarmType) => {
    // 새 게시글
    if (alarm.ctg_index === 1) {
      return navigate(`rdetail/${alarm.post_id}`);
    }
    // 구독
    if (alarm.ctg_index === 2) {
      // return navigate(`/yourpage/${alarm.sub_from}`);
      return navigate(`/yourpage/${shortid.generate()}`, { state: { userId: alarm.sub_from } });
    }
    // 쪽지
    if (alarm.ctg_index === 3) {
      // return navigate(`/mypage/${alarm.targetUserId}`);
      return navigate(`/mypage/${shortid.generate()}`, { state: { userId: currentUser?.id } });
    }
  };

  return (
    <>
      <AlarmContainer>
        {AlarmList?.map((alarm) => {
          const timeAgo = formatTimeAgo(alarm.created_at);
          return (
            <AlarmContents key={alarm.id}>
              <AlarmTime>{timeAgo}</AlarmTime>
              <AlarmInfo>
                <div onClick={() => naviAlarm(alarm)}>{alarm.content}</div>
                <AlarmDeleteIcon onClick={() => deleteButton(alarm.id)} />
              </AlarmInfo>
            </AlarmContents>
          );
        })}
      </AlarmContainer>
    </>
  );
};

export default AlarmBox;

const AlarmContainer = styled.li`
  position: absolute;
  top: 19px;
  right: -285px;
  list-style: none;
  color: black;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--fifth-color);
  border-radius: 6px;
  z-index: 1;
`;

const AlarmContents = styled.div`
  width: 280px;
  /* border-bottom: 1px solid #a7a7a79d; */
  font-size: 14px;
  text-align: left;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--sixth-color);
    font-weight: 600;
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

const AlarmTime = styled.span`
  font-size: 10px;
  color: #686868;
`;

const AlarmInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AlarmDeleteIcon = styled(DeleteIcon)`
  &:hover {
    color: var(--primary-color);
  }
`;
