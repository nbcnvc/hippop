import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteAlarm, getAlarms } from '../../api/alarm';
import { useCurrentUser } from '../../store/userStore';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const AlarmBox = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [alarmCount, setAlarmCount] = useState<number | undefined>();
  const { data: alarms, isLoading, isError } = useQuery(['alarms'], () => getAlarms(currentUserId ?? ''));

  // 새로운 알람의 총 개수
  useEffect(() => {
    if (currentUser) {
      setAlarmCount(alarms?.length);
    }
  }, [alarms]);

  // 알람 드롭박스 토글 (알림 읽기)
  const ToggleAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
  };

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
    // 삭제 확인
    const confirm = window.confirm('알람을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);

      // 삭제 완료
      alert('삭제되었습니다!');
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
      <AlarmButton onClick={ToggleAlarm}>알림{alarmCount}</AlarmButton>
      <AlarmContainer style={{ display: isAlarmOpen ? 'block' : 'none' }}>
        {isAlarmOpen &&
          AlarmList?.map((alarm) => {
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
                <div
                  onClick={() => {
                    navigate(`rdetail/${alarm.post_id}`);
                  }}
                >
                  {alarm.content}
                </div>
                <div>
                  <span>{timeAgo}</span>
                  <button onClick={() => deleteButton(alarm.id)}>삭제</button>
                </div>
              </div>
            );
          })}
      </AlarmContainer>
    </>
  );
};

export default AlarmBox;

const AlarmButton = styled.div`
  cursor: pointer;
`;

const AlarmContainer = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  width: 300px;
  display: block;
  z-index: 1;
`;
