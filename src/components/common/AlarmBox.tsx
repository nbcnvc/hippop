import 'moment/locale/ko'; // 한국어 설정
import moment from 'moment';
import shortid from 'shortid';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AlarmType } from '../../types/types';
import { AlarmBoxProps } from '../../types/props';
import { deleteAlarm } from '../../api/alarm';
import { useCurrentUser } from '../../store/userStore';

import { St } from './style/St.AlarmBox';
import { toast } from 'react-toastify';

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

  // 알람 삭제
  const queryClient = useQueryClient();
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
      if (alarm.post_isdeleted === true) {
        return toast.info('삭제된 게시물 입니다!', {
          className: 'custom-toast',
          theme: 'light'
        });
      } else return navigate(`rdetail/${alarm.post_id}`);
    }
    // 구독
    if (alarm.ctg_index === 2) {
      return navigate(`/yourpage/${shortid.generate()}`, { state: { userId: alarm.sub_from } });
    }
    // 쪽지
    if (alarm.ctg_index === 3) {
      return navigate(`/mypage/${shortid.generate()}`, { state: { userId: currentUser?.id } });
    }
  };

  return (
    <>
      <St.AlarmContainer>
        {AlarmList?.map((alarm) => {
          const timeAgo = formatTimeAgo(alarm.created_at);
          return (
            <St.AlarmContents key={alarm.id}>
              <St.AlarmTime>{timeAgo}</St.AlarmTime>
              <St.AlarmInfo>
                <div onClick={() => naviAlarm(alarm)}>{alarm.content}</div>
                <St.AlarmDeleteIcon onClick={() => deleteButton(alarm.id)} />
              </St.AlarmInfo>
            </St.AlarmContents>
          );
        })}
      </St.AlarmContainer>
    </>
  );
};

export default AlarmBox;
