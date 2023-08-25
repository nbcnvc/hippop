import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createSubscribe, deleteSubscribe, isSubscribe } from '../../../api/subscribe';
import { useCurrentUser } from '../../../store/userStore';
import { SubscribeProps } from '../../../types/props';
import { SubscribeType } from '../../../types/types';

const Subscribe = ({ userId }: SubscribeProps) => {
  // 로그인한 유저 정보 가져오기 (From)
  const currentUser = useCurrentUser();

  // 작성자 && 구독자
  const subscribe: SubscribeType = {
    subscribe_from: currentUser?.id,
    subscribe_to: userId
  };

  // 구독 확인하기
  const { data: subscribed } = useQuery(['subscribe'], () => isSubscribe(subscribe));

  // 구독 하기
  const queryClient = useQueryClient();
  const createMutation = useMutation(createSubscribe, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribe'] });
    }
  });
  const subButton = () => {
    if (!currentUser) {
      return alert('로그인을 해주세요.');
    } else {
      const confirm = window.confirm('구독하시겠습니까?');
      if (confirm) {
        createMutation.mutate(subscribe);
      }
    }
  };

  // 구독 취소
  const deleteMutation = useMutation(deleteSubscribe, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribe'] });
    }
  });
  const cancelButton = () => {
    if (!currentUser) {
      return alert('로그인을 해주세요.');
    } else {
      const confirm = window.confirm('구독을 취소하시겠습니까?');
      if (confirm) {
        deleteMutation.mutate(subscribe);
      }
    }
  };

  return (
    <>
      {subscribe.subscribe_from !== subscribe.subscribe_to && (
        <>
          {subscribed && subscribed.length > 0 ? (
            <button onClick={cancelButton}>구독 취소</button>
          ) : (
            <button onClick={subButton}>구독 하기</button>
          )}
        </>
      )}
    </>
  );
};

export default Subscribe;
