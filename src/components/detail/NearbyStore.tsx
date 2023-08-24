import React, { useEffect } from 'react';
// 라이브러리
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// 타입
import { NearbyStoreProps } from '../../types/props';
// api
import { fetchStoreData } from '../../api/store';
// 스타일
import { styled } from 'styled-components';

interface SliderButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NearbyStore = ({ guName }: NearbyStoreProps) => {
  const { id } = useParams<{ id: string }>();

  const { data: storeData, isLoading, isError } = useQuery({ queryKey: ['nearbyStoreData'], queryFn: fetchStoreData });

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  const filteredStore = storeData?.filter((data) => data.location.includes(guName) && data.id !== Number(id));

  const PrevArrow = ({ onClick }: SliderButton) => {
    return (
      <button onClick={onClick} type="button">
        ＜
      </button>
    );
  };

  const NextArrow = ({ onClick }: SliderButton) => {
    return (
      <button onClick={onClick} type="button">
        ＞
      </button>
    );
  };

  const settings = {
    arrows: true, // 양 끝 화살표 생성여부
    nextArrow: <NextArrow />, // 화살표 버튼을 커스텀해서 사용
    prevArrow: <PrevArrow />,
    dots: false, // 슬라이더 아래에 슬라이드 개수를 점 형태로 표시
    infinite: filteredStore.length > 3, // 슬라이드가 맨 끝에 도달했을 때 처음 슬라이드를 보여줄지 여부
    slidesToShow: 3,
    slidesToScroll: 1, // 옆으로 스크롤할 때 보여줄 슬라이드 수 설정
    speed: 500, // 슬라이드 넘길 때 속도
    autoplay: false, // 슬라이드를 자동으로 넘길지 여부
    autoplaySpeed: 3000, // 자동으로 넘길 시 시간 간격
    pauseOnHover: true
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '100px',
          fontSize: '20px',
          fontWeight: '600'
        }}
      >
        {guName}의 다른 팝업스토어는 어때요?
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {filteredStore.length > 3 ? (
          <StyledSlider {...settings}>
            {filteredStore.map((data) => {
              return (
                <div key={data.id}>
                  <Link to={`/detail/${data.id}`}>
                    <div
                      style={{
                        width: '350px',
                        height: '200px'
                      }}
                    >
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`}
                        alt={`${data.title} 이미지`}
                      />
                    </div>
                    <div>{data.title}</div>
                  </Link>
                </div>
              );
            })}
          </StyledSlider>
        ) : (
          <div
            style={{
              display: 'flex',
              margin: '70px 0'
            }}
          >
            {filteredStore.map((data) => {
              return (
                <div key={data.id}>
                  <Link to={`/detail/${data.id}`}>
                    <div
                      style={{
                        width: '350px',
                        height: '200px',
                        marginRight: '40px'
                      }}
                    >
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`}
                        alt={`${data.title} 이미지`}
                      />{' '}
                      <div>{data.title}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyStore;

const StyledSlider = styled(Slider)`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px 0;

  .slick-slide {
  }
  /* .slick-slide {
  margin: 0 30px; // space(여백)/2
}
.slick-list {
  margin: 0 -30px; // space(여백)/-2
} */
`;
