import MNewPosts from './MNewPosts';
import MStorePosts from './MStorePosts';

import { useEffect, useState } from 'react';
<<<<<<< HEAD:src/components/community/main/mate/MPosts.tsx
import { useLocation } from 'react-router-dom';
=======
>>>>>>> bb3b2240dc5e56842800889c140d0231c4ee0b30:src/components/community/main/MPosts.tsx

import { styled } from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';

const MPosts = () => {
<<<<<<< HEAD:src/components/community/main/mate/MPosts.tsx
  const { state } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용
=======
  const navigate = useNavigate();

>>>>>>> bb3b2240dc5e56842800889c140d0231c4ee0b30:src/components/community/main/MPosts.tsx
  const [sortName, setSortName] = useState<string>('전체보기');
  useEffect(() => {
    if (storeId !== 0) {
      setSortName('팝업메이트 구하기');
    }
  }, [storeId]);
  const toggleSortButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setSortName(name);
  };

  return (
    <>
      <ButtonContainer>
        <ButtonBox>
          <Button name="전체보기" onClick={toggleSortButton}>
            전체보기
          </Button>
        </ButtonBox>
        <div>
          <Search />
          <Input placeholder="팝업스토어 검색" />
        </div>
      </ButtonContainer>
      {sortName === '팝업메이트 구하기' && <MStorePosts />}
      {sortName === '전체보기' && <MNewPosts />}
    </>
  );
};

export default MPosts;

const ButtonContainer = styled.div`
  width: 870px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.button`
  width: 80px;
  font-size: 14px;
  margin: 2px;
  background-color: var(--second-color);
`;

const Input = styled.input`
  width: 180px;
  height: 33px;
  padding: 0 20px 0 40px;
  outline: none;
  border-radius: 18px;
  border: 2px solid var(--fifth-color);
`;

const Search = styled(SearchRoundedIcon)`
  position: absolute;
  margin: 8px 10px 0 10px;
`;
