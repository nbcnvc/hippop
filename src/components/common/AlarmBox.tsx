import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteAlarm, getAlarms } from '../../api/alarm';
import { useCurrentUser } from '../../store/userStore';

const AlarmBox = () => {
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const { data: alarms, isLoading, isError } = useQuery(['alarms'], () => getAlarms(currentUserId ?? ''));

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

  // 알람 삭제 (isRead: ture)
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(['alarms']);
    }
  });
  const deleteButton = (id: number) => {
    // 삭제 확인
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirm) {
      // DB 수정
      deleteMutation.mutate(id);
    }
    // 삭제 완료
    alert('삭제되었습니다!');
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      {alarms?.map((alarm) => {
        const timeAgo = formatTimeAgo(alarm.created_at);
        return (
          <div
            key={alarm.id}
            style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', margin: 'px' }}
          >
            <span>"{alarm.content}"</span>
            <span>&nbsp;{timeAgo}</span>
            <button onClick={() => deleteButton(alarm.id)}>삭제</button>
          </div>
        );
      })}
    </>
  );
};

export default AlarmBox;
