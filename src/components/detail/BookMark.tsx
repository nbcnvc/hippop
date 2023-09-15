import React from 'react';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// api
import { fetchAllBookMark, toggleBookMark } from '../../api/bookmark';
// zustand store
import { useCurrentUser } from '../../store/userStore';
// 타입
import { Bookmark } from '../../types/types';
import { CalendarProps } from '../../types/props';
// mui
import { Skeleton } from '@mui/material';
// 스타일
import { St } from './style/St.BookMark';
// alert
import { toast } from 'react-toastify';

const BookMark = ({ storeData }: CalendarProps) => {
  // 북마크 전체 조회
  const { data: bookMark, isLoading, isError } = useQuery(['bookMark'], () => fetchAllBookMark());

  // store의 id 가져오기
  const storeId = storeData.id;

  // 로그인한 유저
  const currentUser = useCurrentUser();

  // Query
  const queryClient = useQueryClient();

  // Query Mutation
  const toggleMutation = useMutation(toggleBookMark, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookMark'] });
    }
  });

  // 토글 핸들러
  const onClickToggle = () => {
    if (currentUser) {
      const toogleBookMark: Bookmark = {
        user_id: currentUser.id ?? '',
        store_id: storeId
      };
      toggleMutation.mutate(toogleBookMark);
    } else {
      toast.info('로그인을 해주세요 ! :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      return;
    }
  };

  // 스토어, 유저 필터링 북마크 카운트
  const CountMyBookMark = bookMark?.filter(
    (item) => currentUser && item.user_id === currentUser.id && item.store_id === storeId
  ).length;

  if (isLoading) {
    return (
      <div style={{ marginLeft: '30px' }}>
        <Skeleton variant="text" width={70} height={50} />
      </div>
    );
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <>
      {CountMyBookMark !== undefined && (
        <>
          {CountMyBookMark > 0 ? (
            <St.BookMarkBtn onClick={onClickToggle}>
              <St.BookMarkOn sx={{ fontSize: 50 }} />
            </St.BookMarkBtn>
          ) : (
            <St.BookMarkBtn onClick={onClickToggle}>
              <St.BookMarkOff sx={{ fontSize: 50 }} />
            </St.BookMarkBtn>
          )}
        </>
      )}
    </>
  );
};

export default BookMark;
