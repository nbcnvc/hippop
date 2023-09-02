import RNewPosts from './RNewPosts';

import { useState } from 'react';
import RPopularPosts from './RPopularPosts';

const RPosts = () => {
  const [sortName, setSortName] = useState<string>('최신순');
  const toggleSortButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setSortName(name);
  };
  return (
    <>
      <div>
        <div>
          <button name="최신순" onClick={toggleSortButton}>
            최신순
          </button>
          <button name="인기순" onClick={toggleSortButton}>
            인기순
          </button>
        </div>
        <div>
          검색: <input />
        </div>
      </div>
      {sortName === '최신순' ? <RNewPosts /> : <RPopularPosts />}
    </>
  );
};

export default RPosts;
