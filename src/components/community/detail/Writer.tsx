import Subscribe from './Subscribe';

import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../../api/user';
import { UserInfo } from '../../../types/types';
import { WriterProps } from '../../../types/props';

const Writer = ({ userId, setWriterInfo }: WriterProps) => {
  const { pathname } = useLocation();

  // 작성자 정보 가져오기 (To)
  const { data: user } = useQuery<UserInfo | null>({ queryKey: ['user', userId], queryFn: () => getUser(userId) });

  if (user) {
    setWriterInfo(user);
  }

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
          {user?.avatar_url.startsWith('profile/') ? (
            <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user?.avatar_url}`} alt="User Avatar" />
          ) : (
            <Img src={user?.avatar_url} alt="User Avatar" />
          )}
          <div>{user?.name}</div>
        </div>

        {pathname === '/review' && <Subscribe userId={userId} />}
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
