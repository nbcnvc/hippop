import React, { useEffect } from 'react';
// 라이브러리
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// api
import { fetchStoreData } from '../../api/store';
// 타입
import { NearbyStoreProps } from '../../types/props';
// mui
import { Skeleton } from '@mui/material';
// 스타일
import { St } from './style/St.NearbyStore';

interface SliderButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NearbyStore = ({ guName, setNearbyStoreMarker }: NearbyStoreProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // store 전체 조회 (isclosed, false인 것만)
  const { data: storeData, isLoading, isError } = useQuery({ queryKey: ['nearbyStoreData'], queryFn: fetchStoreData });

  // 주변 지역 팝업스토어 filter
  const filteredStore = storeData?.filter((data) => data.location.includes(guName) && data.id !== Number(id));
  const columnCount = filteredStore ? filteredStore.length : 0;

  useEffect(() => {
    setNearbyStoreMarker(filteredStore);
  }, [guName, storeData]);

  // 슬라이드 화살표
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

  // 슬라이드 세팅
  const settings = {
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
    speed: 500,

    // 반응형
    responsive: [
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  // detail page 이동
  const navDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Skeleton variant="text" width={90} height={30} />
        <div style={{ display: 'flex' }}>
          <Skeleton variant="text" width={400} height={800} />
          <div style={{ margin: '0 15px 0 15px' }}>
            <Skeleton variant="text" width={400} height={800} />
          </div>
          <Skeleton variant="text" width={400} height={800} />
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <St.NearbyStoreContainer>
      <div className="nearby-store-title">
        <h1>{guName}의 다른 팝업스토어는 어때요?</h1>
      </div>
      {filteredStore && filteredStore?.length > 3 && (
        <St.StyledSlider {...settings}>
          {filteredStore?.map((data) => {
            return (
              <St.Card onClick={() => navDetail(data.id)} key={data.id}>
                <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`} />
                <St.InfoBox>
                  <div>
                    {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                    <St.StoreName>{data.title}</St.StoreName>
                    {data.period_start} ~ {data.period_end}
                  </div>
                  <St.DetailBtn>상세보기</St.DetailBtn>
                </St.InfoBox>
              </St.Card>
            );
          })}
        </St.StyledSlider>
      )}
      {filteredStore && filteredStore.length === 3 && (
        <St.StyledSliderTriple {...settings}>
          {filteredStore?.map((data) => {
            return (
              <St.Card onClick={() => navDetail(data.id)} key={data.id} className="custom-card">
                <St.Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`} className="custom-img" />
                <St.InfoBox className="custom-info">
                  <div>
                    {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                    <St.StoreName>{data.title}</St.StoreName>
                    {data.period_start} ~ {data.period_end}
                  </div>
                  <St.DetailBtn onClick={() => navDetail(data.id)}>상세보기</St.DetailBtn>
                </St.InfoBox>
              </St.Card>
            );
          })}
        </St.StyledSliderTriple>
      )}
      {filteredStore && filteredStore.length < 3 && filteredStore.length > 0 && (
        <St.GridContainer>
          <St.GridWrapper columnCount={columnCount}>
            {filteredStore?.map((data) => {
              return (
                <St.Card onClick={() => navDetail(data.id)} key={data.id} className="custom-card">
                  <St.Img
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`}
                    className="custom-img"
                  />
                  <St.InfoBox className="custom-info">
                    <div>
                      {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                      <St.StoreName>{data.title}</St.StoreName>
                      {data.period_start} ~ {data.period_end}
                    </div>
                    <St.DetailBtn onClick={() => navDetail(data.id)}>상세보기</St.DetailBtn>
                  </St.InfoBox>
                </St.Card>
              );
            })}
          </St.GridWrapper>
        </St.GridContainer>
      )}
      {filteredStore && filteredStore?.length === 0 && (
        <St.NullContainer>아쉽게도 현재 운영중인 '{guName}'의 다른 팝업스토어는 없습니다🥲</St.NullContainer>
      )}
    </St.NearbyStoreContainer>
  );
};

export default NearbyStore;
