import React from 'react';
import { styled } from 'styled-components';

const MyPage = () => {
  return (
    <MypageTag>
      <div>
        <h2>MyPage</h2>
        <img src="/asset/myPage.png" alt="test image" />
      </div>
    </MypageTag>
  );
};

export default MyPage;

const MypageTag = styled.div`
  width: 100%;
  h2 {
    font-size: 2rem;
    text-align: center;
    margin: 1rem 0;
  }
  img {
    max-width: 100%;
    width: ;
  }
`;
