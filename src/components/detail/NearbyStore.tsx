import React, { useEffect } from 'react';
// 라이브러리
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

// 타입
import { NearbyStoreProps } from '../../types/props';
// api
import { fetchStoreData } from '../../api/store';
// 스타일
import { styled } from 'styled-components';

interface SliderButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NearbyStore = ({ guName, setNearbyStoreMarker }: NearbyStoreProps) => {
  const { id } = useParams<{ id: string }>();

  const { data: storeData, isLoading, isError } = useQuery({ queryKey: ['nearbyStoreData'], queryFn: fetchStoreData });

  const filteredStore = storeData?.filter((data) => data.location.includes(guName) && data.id !== Number(id));

  useEffect(() => {
    if (storeData) {
      setNearbyStoreMarker(filteredStore);
    }
  }, [storeData]);

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

  // filteredStore.length에 따라 slidesToShow 값을 동적으로 설정
  let desiredSlidesToShow;

  if (filteredStore && filteredStore.length >= 4) {
    desiredSlidesToShow = 3;
  } else if (filteredStore && filteredStore.length === 3) {
    desiredSlidesToShow = 2;
  } else if (filteredStore && filteredStore.length === 2) {
    desiredSlidesToShow = 1;
  } else if (filteredStore && filteredStore.length === 1) {
    desiredSlidesToShow = 0;
  }

  console.log(desiredSlidesToShow);

  // 위에서 계산한 값을 사용하여 설정 객체를 생성
  const settings = {
    // // infinite: filteredStore && filteredStore.length > 0 ? true : false,
    // // slidesToShow: desiredSlidesToShow,
    // // slidesToScroll: filteredStore && filteredStore.length > 2 ? 1 : 0,
    // initialSlide: 0,

    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    speed: 500
  };

  //   // responsive: [
  //   //   {
  //   //     breakpoint: 1024,
  //   //     settings: {
  //   //       slidesToShow: 3,
  //   //       slidesToScroll: 3
  //   //     }
  //   //   },
  //   //   {
  //   //     breakpoint: 600,
  //   //     settings: {
  //   //       slidesToShow: 2,
  //   //       slidesToScroll: 2
  //   //     }
  //   //   },
  //   //   {
  //   //     breakpoint: 320,
  //   //     settings: {
  //   //       slidesToShow: 1,
  //   //       slidesToScroll: 1
  //   //     }
  //   //   }

  console.log(filteredStore);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

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
      {filteredStore && filteredStore?.length > 3 && (
        <StyledSlider {...settings}>
          {filteredStore?.map((data) => {
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
      )}
      {filteredStore && filteredStore.length < 4 && filteredStore.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button> ＜ </button>
          <div
            style={{
              width: '100%',
              display: 'grid',
              placeItems: 'center',
              gridTemplateColumns: `repeat(${filteredStore && filteredStore.length}, 1fr)`,
              margin: '70px 0'
            }}
          >
            {filteredStore?.map((data) => {
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
          </div>
          <button> ＞ </button>
        </div>
      )}
      {filteredStore && filteredStore?.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '70px',
            fontSize: '20px'
          }}
        >
          아쉽게도 현재 운영중인 {guName}의 다른 팝업스토어는 없습니다🥲
        </div>
      )}
    </div>
  );
};

export default NearbyStore;

const StyledSlider = styled(Slider)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px 0;

  .slick-slide {
    /* width: 90%; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-slide {
    /* margin: 0 30px; // space(여백)/2 */
  }
  .slick-list {
    /* margin: 0 -30px; // space(여백)/-2 */
    overflow: hidden;
  }
`;
