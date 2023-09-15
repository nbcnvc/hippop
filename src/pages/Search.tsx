import React, { useEffect } from 'react';
// 컴포넌트
import SearchList from '../components/search/SearchList';

const Search = () => {
  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);

  return <SearchList />;
};

export default Search;
