import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteAlarm, getAlarms } from '../../api/alarm';
import { useCurrentUser } from '../../store/userStore';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { AlarmType } from '../../types/types';

const AlarmBox = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const { data: alarms, isLoading, isError } = useQuery(['alarms'], () => getAlarms(currentUserId ?? ''));

  // 알람 드롭박스 토글
  const ToggleAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
  };

  // 알람 드롭 박스 닫기
  // const closeAlarm = () => {
  //   setIsAlarmOpen(false)
  // }

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
      return navigate(`/mypage/${alarm.sub_from}`);
    }
    // 쪽지
    if (alarm.ctg_index === 3) {
      return navigate(`/mypage/${alarm.targetUserId}`);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <AlarmButton onClick={ToggleAlarm} />
      {isAlarmOpen && (
        <AlarmContainer>
          {AlarmList?.map((alarm) => {
            const timeAgo = formatTimeAgo(alarm.created_at);
            return (
              <div
                key={alarm.id}
                style={{
                  backgroundColor: '#FFFBF4',
                  border: '2px solid #F24D0D',
                  color: '#333',
                  borderRadius: '10px',
                  padding: '10px',
                  margin: '5px'
                }}
              >
                <div onClick={() => naviAlarm(alarm)}>{alarm.content}</div>
                <div>
                  <span>{timeAgo}</span>
                  <button onClick={() => deleteButton(alarm.id)}>삭제</button>
                </div>
              </div>
            );
          })}
        </AlarmContainer>
      )}
      {/* {isAlarmOpen && <div onClick={closeAlarm} />} */}
    </>
  );
};

export default AlarmBox;

const AlarmButton = styled(NotificationsRoundedIcon)`
  cursor: pointer;
`;

const AlarmContainer = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  width: 300px;
  z-index: 1;
`;
