import React from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';

const HotPlace = ({ setCategory, setIsSelected }: HotPlaceProps) => {
  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
    setIsSelected(undefined);
  };

  const handleShowMarker = () => {
    setCategory('');
    setIsSelected(undefined);
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '50px'
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: '600' }}>함께 갈만한 핫플레이스 추천!</div>
        <div style={{ marginTop: '10px', fontSize: '16px' }}> (카테고리 클릭 후) 마커핀을 클릭해 보세요!</div>
        <div style={{ margin: '25px 0' }}>
          <button name="맛집" onClick={handleHotPlaceCategory}>
            맛집
          </button>
          <button name="카페" onClick={handleHotPlaceCategory}>
            카페
          </button>
          <button name="술집" onClick={handleHotPlaceCategory}>
            술집
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <button onClick={handleShowMarker}>핫플레이스 마커핀 끄기</button>
      </div>
    </div>
  );
};

export default HotPlace;

// const;
