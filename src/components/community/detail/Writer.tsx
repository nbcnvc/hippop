import Subscribe from './Subscribe';

import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../../api/user';
import { UserInfo } from '../../../types/types';
import { WriterProps } from '../../../types/props';

const Writer = ({ userId }: WriterProps) => {
  // 작성자 정보 가져오기 (To)
  const { data: user } = useQuery<UserInfo | null>({ queryKey: ['user', userId], queryFn: () => getUser(userId) });

  return (
    <>
      <div style={{ width: '95%', border: '1px solid black', padding: '20px', margin: '10px' }}>
        <div>작성자</div>
        <Img src={user?.avatar_url} alt="User Avatar" />
        <div>{user?.name}</div>
        <Subscribe userId={userId} />
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
