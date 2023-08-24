import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../../api/user';
import { UserInfo } from '../../../types/types';
import { WriterProps } from '../../../types/props';
// import Message from '../../message/Message';
// import { useLocation } from 'react-router-dom';
// import { useState } from 'react';
// import Message from '../../message/Message';

const Writer = ({ userId, setOpenDetail }: WriterProps) => {
  // User 정보 가져오기
  const { data: user } = useQuery<UserInfo | null>({ queryKey: ['user', userId], queryFn: () => getUser(userId) });

  console.log('user', user);
  return (
    <>
      <div
        style={{
          width: '90%',
          border: '1px solid black',
          padding: '20px',
          margin: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <Img src={user?.avatar_url} alt="User Avatar" />
          <div>{user?.name}</div>
        </div>
      </div>
    </>
  );
};

export default Writer;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;
