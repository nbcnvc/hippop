import RNewPosts from './RNewPosts';
import RPopularPosts from './RPopularPosts';

import { useState } from 'react';

import { styled } from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const RPosts = () => {
  const [sortName, setSortName] = useState<string>('최신순');
  const toggleSortButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setSortName(name);
  };
  return (
    <>
      <ButtonContainer>
        <Between>
          <ButtonBox>
            <Button name="최신순" onClick={toggleSortButton}>
              최신순
            </Button>
            <Button name="인기순" onClick={toggleSortButton}>
              인기순
            </Button>
          </ButtonBox>
          <div>
            <Search />
            <Input placeholder="팝업스토어 검색" />
          </div>
        </Between>
      </ButtonContainer>
      {sortName === '최신순' ? <RNewPosts /> : <RPopularPosts />}
    </>
  );
};

export default RPosts;

const ButtonContainer = styled.div`
  width: 870px;
`;

const Between = styled.div`
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
