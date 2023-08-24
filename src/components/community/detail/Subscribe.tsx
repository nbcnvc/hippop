import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { isSubscribe, toggleSubscribe } from '../../../api/subscribe';
import { useCurrentUser } from '../../../store/userStore';
import { SubscribeProps } from '../../../types/props';
import { SubscribeType } from '../../../types/types';

const Subscribe = ({ userId }: SubscribeProps) => {
  // 구독 여부
  const [sub, setSub] = useState<boolean>(false);
  // 로그인한 유저 정보 가져오기 (From)
  const currentUser = useCurrentUser();

  // 작성자 구독자
  const subscribe: SubscribeType = {
    subscribe_from: currentUser?.id,
    subscribe_to: userId
  };

  // 구독 확인하기
  const { data: subscribed } = useQuery(['subscribe'], () => isSubscribe(subscribe));

  // 작성자 구독하기
  const queryClient = useQueryClient();
  const toggleMutation = useMutation(toggleSubscribe, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribe'] });
    }
  });

  // 구독 버튼
  const subButton = () => {
    if (!currentUser) {
      return alert('로그인을 해주세요.');
    } else toggleMutation.mutate(subscribe);
  };

  return (
    <>
      <button onClick={subButton}>{subscribed && subscribed?.length > 0 ? '구독 취소' : '구독 하기'}</button>
    </>
  );
};

export default Subscribe;
