import { useState } from 'react';
// 라이브러리
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// 타입
import { Store } from '../../types/types';
// api
import { fetchDetailData } from '../../api/store';
// 컴포넌트
import Share from './Share';
import Calendar from './Calendar';
import BookMark from './BookMark';
import StoreMap from './StoreMap';
// 스타일
import { styled } from 'styled-components';
// mui
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store | null>({ queryKey: ['detailData', Number(id)], queryFn: () => fetchDetailData(Number(id)) });

  const handleopenlink = (link: string) => {
    window.open(link, '_blank');
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true
  };

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>데이터를 로딩 중입니다.</div>;
  }

  return (
    <DetailContainer>
      {storeData && (
        <>
          <div className="store-detail">
            <div className="image-slider">
              <Slider {...settings}>
                {storeData.images.map((image, index) => (
                  <div key={index}>
                    <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image}`} alt={`Image ${index}`} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="store-info">
              <h1>{storeData.title}</h1>
              {/* <BookMark storeData={storeData} /> */}
              <div className="store-body">
                <div>{storeData.body}</div>
              </div>
              <div className="store-text">
                <div>
                  <span>위치</span> {storeData.location}
                </div>
                <div>
                  <span>기간</span> {storeData.period_start} ~ {storeData.period_end}
                </div>
                <div>
                  <span>운영 시간</span> {storeData.opening}
                </div>
                <div>
                  <span>예약 여부</span>
                </div>
                <div>
                  <span>링크 </span>
                  <LinkIcon
                    onClick={() => {
                      handleopenlink(storeData.link);
                    }}
                  />
                </div>
              </div>
              <div className="button-box">
                <button>후기 보러가기</button>
                <button>팝업 메이트 구하기</button>
                <button className="share-button">공유</button>
                {/* <Share /> */}
              </div>
            </div>
            <CalendarIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            {isHovered && <Calendar storeData={storeData} />}
          </div>
          <StoreMap storeLocation={storeData.location} title={storeData.title} />
        </>
      )}
    </DetailContainer>
  );
};

export default StoreDetail;

const DetailContainer = styled.div`
  max-width: 1920px;
  min-width: 900px;
  width: 60%;
  height: 100%;
  margin: 90px auto;

  .store-detail {
    position: relative;
    display: flex;
    gap: 30px;
    margin-bottom: 150px;

    .image-slider {
      width: 630px;
      height: 100%;

      div {
        display: flex;
        justify-content: center;

        img {
          width: 610px;
          height: 570px;
          object-fit: cover;
          border: 3px solid var(--fifth-color);
          border-radius: 10px;
        }
      }
    }

    .store-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      padding: 15px 0 10px 0;

      h1 {
        color: var(--fifth-color);
        font-size: 32px;
        background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
      }

      .store-body {
        border-bottom: 2px dashed #65656587;

        div {
          height: 124px;
          font-size: 18px;
          line-height: 26px;
          overflow: auto;
          margin: 20px 0;
          padding: 0 25px 0 5px;
        }
      }

      .store-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 5px;

        div {
          display: flex;
          align-items: center;
          font-size: 18px;
          margin: 15px 0;
        }
        span {
          font-size: 18px;
          font-weight: 600;
          margin-right: 15px;
        }
      }

      button {
        margin: 10px 20px 20px 0;
        padding: 7px 25px;
      }

      .button-box {
        .share-button {
          background-color: #fff;
          color: var(--fifth-color);
        }
      }
    }
  }
`;

const LinkIcon = styled(InsertLinkIcon)`
  cursor: pointer;

  &:hover {
    color: var(--sixth-color);
    transform: scale(1.1);
  }
`;

const CalendarIcon = styled(CalendarMonthIcon)`
  position: absolute;
  /* bottom: 203px; */
  /* right: 375px; */
  margin-left: 921px;
  margin-top: 299px;
  cursor: pointer;

  &:hover {
    color: var(--sixth-color);
    transform: scale(1.1);
  }
`;
