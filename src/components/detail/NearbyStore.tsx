import React, { useEffect } from 'react';
// 라이브러리
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
// 타입
import { NearbyStoreProps } from '../../types/props';
// api
import { fetchStoreData } from '../../api/store';
// mui
import { Skeleton } from '@mui/material';

interface SliderButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NearbyStore = ({ guName, setNearbyStoreMarker }: NearbyStoreProps) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: storeData, isLoading, isError } = useQuery({ queryKey: ['nearbyStoreData'], queryFn: fetchStoreData });

  const filteredStore = storeData?.filter((data) => data.location.includes(guName) && data.id !== Number(id));
  const columnCount = filteredStore ? filteredStore.length : 0;

  useEffect(() => {
    setNearbyStoreMarker(filteredStore);
  }, [guName, storeData]);

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

  // 위에서 계산한 값을 사용하여 설정 객체를 생성
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
      <div>
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
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <NearbyStoreContainer>
      <div className="nearby-store-title">
        <h1>{guName}의 다른 팝업스토어는 어때요?</h1>
      </div>
      {filteredStore && filteredStore?.length > 3 && (
        <StyledSlider {...settings}>
          {filteredStore?.map((data) => {
            return (
              <div key={data.id}>
                <Card key={data.id}>
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`} />
                  <InfoBox>
                    <div>
                      {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                      <StoreName>{data.title}</StoreName>
                      {data.period_start} ~ {data.period_end}
                    </div>
                    <DetailBtn onClick={() => navDetail(data.id)}>상세보기</DetailBtn>
                  </InfoBox>
                </Card>
              </div>
            );
          })}
        </StyledSlider>
      )}
      {filteredStore && filteredStore.length === 3 && (
        <StyledSliderTriple {...settings}>
          {filteredStore?.map((data) => {
            return (
              <div key={data.id}>
                <Card key={data.id} className="custom-card">
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`} className="custom-img" />
                  <InfoBox className="custom-info">
                    <div>
                      {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                      <StoreName>{data.title}</StoreName>
                      {data.period_start} ~ {data.period_end}
                    </div>
                    <DetailBtn onClick={() => navDetail(data.id)}>상세보기</DetailBtn>
                  </InfoBox>
                </Card>
              </div>
            );
          })}
        </StyledSliderTriple>
      )}
      {filteredStore && filteredStore.length < 3 && filteredStore.length > 0 && (
        <GridContainer>
          <GridWrapper columnCount={columnCount}>
            {filteredStore?.map((data) => {
              return (
                <div key={data.id}>
                  <Card key={data.id} className="custom-card">
                    <Img
                      src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`}
                      className="custom-img"
                    />
                    <InfoBox className="custom-info">
                      <div>
                        {data.location.split(' ').slice(0, 1)} {data.location.split(' ').slice(1, 2)}
                        <StoreName>{data.title}</StoreName>
                        {data.period_start} ~ {data.period_end}
                      </div>
                      <DetailBtn onClick={() => navDetail(data.id)}>상세보기</DetailBtn>
                    </InfoBox>
                  </Card>
                </div>
              );
            })}
          </GridWrapper>
        </GridContainer>
      )}
      {filteredStore && filteredStore?.length === 0 && (
        <NullContainer>아쉽게도 현재 운영중인 '{guName}'의 다른 팝업스토어는 없습니다🥲</NullContainer>
      )}
    </NearbyStoreContainer>
  );
};

export default NearbyStore;

const NearbyStoreContainer = styled.div`
  .nearby-store-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 150px 0 100px 0;

    h1 {
      color: var(--fifth-color);
      font-size: 30px;
      background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    }
  }
`;

const StyledSlider = styled(Slider)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1920px;
  min-width: 764px;
  margin: 0 auto;

  @media (max-width: 844px) {
    /* width: 744px; */
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const StyledSliderTriple = styled(Slider)`
  max-width: 1920px;
  min-width: 764px;
  margin: 0 auto;

  @media (max-width: 2100px) {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const Card = styled.div`
  /* width: 370px !important ; */
  width: 330px !important ;

  height: 500px;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);

  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  box-sizing: border-box;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    border: 6px solid var(--primary-color);
  }
  &:active {
    background-color: rgb(215, 215, 219);
    transform: scale(0.98);
  }
`;

const InfoBox = styled.div`
  /* width: 330px; */
  width: 290px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 20px;
`;

const Img = styled.img`
  /* width: 340px;
  height: 369px; */
  width: 300px;
  height: 359px;

  object-fit: cover;
  border-radius: 10px;

  border: 3px solid var(--fifth-color);
`;

const StoreName = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  font-size: 20px;
  font-weight: bold;

  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 13px 0 13px 0;
`;

const DetailBtn = styled.button`
  background-color: var(--second-color);
  color: white;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridWrapper = styled.div<{ columnCount: number }>`
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  place-items: center;
  grid-template-columns: ${({ columnCount }) => `repeat(${columnCount}, 1fr)`};

  @media (max-width: 1800px) {
    width: 744px;

    .custom-card {
      width: 330px !important ;
      margin-right: 5px;
    }

    .custom-info {
      width: 290px;
    }

    .custom-img {
      width: 300px;
      height: 359px;
    }
  }
`;

const NullContainer = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  margin: 100px 0 150px 0;
`;
