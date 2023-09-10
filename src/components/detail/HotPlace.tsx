import React, { useState } from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';
// icon
import { FaRegLightbulb } from 'react-icons/fa';
import { St } from './style/St.HotPlace';

const HotPlace = ({ category, setCategory, setIsSelected }: HotPlaceProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // 핫플레이스 카테고리 클릭 감지 함수
  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
    setIsSelected(undefined);
    setIsOpened(true);
  };

  // 마커핀 off 함수
  const handleCloseMarker = () => {
    setCategory('');
    setIsSelected(undefined);
    setIsOpened(false);
  };

  console.log('category', category);

  return (
    <St.HotPlaceContainer>
      <div className="hotplace-title">
        <h1>함께 갈만한 핫플레이스 추천!</h1>
        <div className="noti-box">
          <span className="info-tip">
            <FaRegLightbulb />
            이용 Tip
          </span>
          카테고리 클릭 후 마커핀을 클릭해 보세요 :)
        </div>
        <div className="button-box">
          <button className={category === '맛집' ? 'select' : ''} name="맛집" onClick={handleHotPlaceCategory}>
            맛집
          </button>
          <button className={category === '카페' ? 'select' : ''} name="카페" onClick={handleHotPlaceCategory}>
            카페
          </button>
          <button className={category === '술집' ? 'select' : ''} name="술집" onClick={handleHotPlaceCategory}>
            술집
          </button>
        </div>
      </div>
      <div className="toggle-button">
        {isOpened && <span className="marker-info">마커핀 off →</span>}
        <St.IOSSwitch checked={isOpened} onClick={handleCloseMarker} />
      </div>
    </St.HotPlaceContainer>
  );
};

export default HotPlace;
