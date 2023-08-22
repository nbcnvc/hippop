import React from 'react';

const HotPlace = () => {
  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600' }}>이 주변 핫플레이스를 추천해드립니다 !</div>
      <div>
        <button>맛집</button>
        <button>카페</button>
        <button>술집</button>
      </div>
    </div>
  );
};

export default HotPlace;
