import React, { ReactEventHandler, SetStateAction } from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';

const HotPlace = ({ setCategory }: HotPlaceProps) => {
  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
  };

  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600' }}>팝업 스토어 주변 핫플레이스 추천 !</div>
      <div>
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
  );
};

export default HotPlace;
