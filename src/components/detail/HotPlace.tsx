import React from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';
// import { HotPlaceData } from '../../types/types';
// 라이브러리
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const HotPlace = ({ setCategory, setIsShowPMarker }: HotPlaceProps) => {
  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
  };

  const handleShowMarker = () => {
    setIsShowPMarker((prev) => !prev);
  };

  const settings = {
    arrows: true, // 양 끝 화살표 생성여부
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    dots: false, // 슬라이더 아래에 슬라이드 개수를 점 형태로 표시
    infinite: true, // 슬라이드가 맨 끝에 도달했을 때 처음 슬라이드를 보여줄지 여부
    initialSlide: 0,
    slidesToShow: 4, // 화면에 한번에 표시할 슬라이드 개수 설정
    slidesToScroll: 1, // 옆으로 스크롤할 때 보여줄 슬라이드 수 설정
    speed: 500, // 슬라이드 넘길 때 속도
    autoplay: false, // 슬라이드를 자동으로 넘길지 여부
    autoplaySpeed: 3000, // 자동으로 넘길 시 시간 간격
    pauseOnHover: true
  };

  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600', marginTop: '50px' }}>함께 갈만한 핫플레이스 추천!</div>
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
      {/* <Slider {...settings}>
        {hotPlaceData?.map((hotPlace: HotPlaceData) => {
          return (
            <div key={hotPlace.id}>
              <img style={{ width: '180px' }} src={hotPlace.images[5]} alt={`${hotPlace.place_name} 이미지`} />
              <div>{hotPlace.place_name}</div>
            </div>
          );
        })}
      </Slider> */}
    </div>
  );
};

export default HotPlace;

// const;
