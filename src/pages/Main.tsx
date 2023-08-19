import React from 'react';
import { styled } from 'styled-components';
const Main = () => {
  return (
    <MainTag>
      <div>
        <h2>Main</h2>
        <img src="/asset/test-mainImg.png" alt="test-image" />
      </div>
    </MainTag>
  );
};

export default Main;

const MainTag = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px dotted gray;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
  }
  img {
    width: 80vw;
  }
`;
