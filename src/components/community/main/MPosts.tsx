import MNewPosts from './MNewPosts';

import { useEffect, useState } from 'react';

import { styled } from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';

const MPosts = () => {
  const navigate = useNavigate();

  const [sortName, setSortName] = useState<string>('전체보기');
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
