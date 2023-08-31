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

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store | null>({ queryKey: ['detailData', Number(id)], queryFn: () => fetchDetailData(Number(id)) });

  const handleopenlink = (link: string) => {
    window.open(link, '_blank');
  };

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true
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
            <div>
              <h1>{storeData.title}</h1>
              {/* <BookMark storeData={storeData} /> */}
              <div className="store-body">{storeData.body}</div>
              <div className="store-info">
                <div>
                  <span>위치</span> {storeData.location}
                </div>
                <div>
                  <span>기간</span> {storeData.period_start} ~ {storeData.period_end}
                  {/* <Calendar storeData={storeData} /> */}
                </div>
                <div>
                  <span>운영 시간</span> {storeData.opening}
                </div>
                <div>
                  <span>링크 </span>
                  <LinkIcon
                    onClick={() => {
                      handleopenlink(storeData.link);
                    }}
                  />
                </div>
                <button>후기 보러가기</button>
                <button>팝업 메이트 구하기</button>
                {/* <Share /> */}
              </div>
            </div>
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
  width: 50%;
  margin: 70px auto;

  .store-detail {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .image-slider {
      width: 400px;
      height: 340px;

      div {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 380px;
          height: 320px;
          object-fit: cover;
          border: 3px solid var(--fifth-color);
          border-radius: 10px;
        }
      }
    }

    h1 {
      color: var(--fifth-color);
      font-size: 24px;
      background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    }

    .store-body {
      border-bottom: 2px dashed #65656587;
      padding: 20px 20px 20px 0;
    }

    .store-info {
      div {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin: 12px 0;
      }
      span {
        font-weight: 600;
        margin-right: 10px;
      }
    }
  }
`;

const LinkIcon = styled(InsertLinkIcon)`
  cursor: pointer;
`;
