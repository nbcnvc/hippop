import React, { ReactEventHandler, SetStateAction } from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';

const HotPlace = ({ setCategory, setIsShow }: HotPlaceProps) => {
  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
  };

  const handleShowMarker = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600', marginTop: '50px' }}>팝업 스토어 주변 핫플레이스 추천 !</div>
      <div style={{ marginTop: '20px' }}>
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
      <button onClick={handleShowMarker}>지도로 위치 확인해보기</button>
    </div>
  );
};

export default HotPlace;
