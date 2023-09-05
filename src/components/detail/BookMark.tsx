import React from 'react';
// 라이브러리
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
// api
import { fetchAllBookMark, toggleBookMark } from '../../api/bookmark';
// zustand store
import { useCurrentUser } from '../../store/userStore';
// 타입
import { Bookmark } from '../../types/types';
import { CalendarProps } from '../../types/props';
// mui
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { Skeleton } from '@mui/material';

const BookMark = ({ storeData }: CalendarProps) => {
  // 북마크 전체 조회
  const { data: bookMark, isLoading, isError } = useQuery(['bookMark'], () => fetchAllBookMark());

  // store의 id 가져오기
  const storeId = storeData.id;

  // 로그인한
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
      // Check if currentUser is not null
      const toogleBookMark: Bookmark = {
        user_id: currentUser.id ?? '',
        store_id: storeId
      };
      toggleMutation.mutate(toogleBookMark);
    }
  };

  // 스토어, 유저 필터링 북마크 카운트
  const CountMyBookMark = bookMark?.filter(
    (item) => currentUser && item.user_id === currentUser.id && item.store_id === storeId
  ).length;

  if (isLoading) {
    return (
      <div>
        {' '}
        <div style={{ marginLeft: '30px' }}>
          <Skeleton variant="text" width={70} height={50} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      {CountMyBookMark !== undefined && (
        <>
          {CountMyBookMark > 0 ? (
            <BookMarkBtn onClick={onClickToggle}>
              <BookMarkOn sx={{ fontSize: 50 }} />
            </BookMarkBtn>
          ) : (
            <BookMarkBtn onClick={onClickToggle}>
              <BookMarkOff sx={{ fontSize: 50 }} />
            </BookMarkBtn>
          )}
        </>
      )}
    </>
  );
};

export default BookMark;

const BookMarkBtn = styled.div`
  color: #2b3467;
`;

const BookMarkOn = styled(BookmarkIcon)`
  font-size: large;
  cursor: pointer;
`;

const BookMarkOff = styled(TurnedInNotIcon)`
  font-size: large;
  cursor: pointer;
`;
