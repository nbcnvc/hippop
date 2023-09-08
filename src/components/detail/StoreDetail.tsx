import { useEffect, useRef, useState } from 'react';
// 라이브러리
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { styled } from 'styled-components';
// 타입
import { Store } from '../../types/types';
// api
import { fetchDetailData } from '../../api/store';
// 컴포넌트
import Share from './Share';
import Calendar from './Calendar';
import BookMark from './BookMark';
import StoreMap from './StoreMap';
// mui
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IosShareIcon from '@mui/icons-material/IosShare';
import Menu from '@mui/material/Menu';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from '@mui/material';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    data: storeData,
    isLoading,
    isError,
    refetch
  } = useQuery<Store | null>({
    queryKey: ['detailData', Number(id)],
    queryFn: () => fetchDetailData(Number(id))
    // refetchOnWindowFocus: true
  });

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 부분
    refetch();
    setIsClicked(false);

    const handleAlarmWindowClick = (event: MouseEvent) => {
      if (!calendarRef.current?.contains(event.target as Node)) {
        setIsClicked(false);
      }
    };

    window.addEventListener('click', handleAlarmWindowClick);
    return () => {
      window.removeEventListener('click', handleAlarmWindowClick);
      window.scrollTo(0, 0);
    };
  }, [id]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleopenlink = (link: string) => {
    window.open(link, '_blank');
  };

  const handleMouseEnter = () => setIsClicked(!isClicked);

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

  if (isLoading) {
    return (
      <div>
        <DetailContainer>
          <div>
            <div className="store-detail">
              <div className="image-slider">
                <Skeleton variant="rectangular" width={600} height={600} />
              </div>
              <div className="store-info">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="text" width={300} height={30} />
                  <div style={{ marginLeft: '300px' }}>
                    <Skeleton variant="text" width={30} height={30} />
                  </div>
                </div>

                <div className="store-body">
                  <Skeleton variant="text" width={300} height={30} />
                </div>
                <div className="store-text">
                  <div>
                    <Skeleton variant="text" width={300} height={30} />
                  </div>
                  <div>
                    <Skeleton variant="text" width={300} height={30} />
                    <div style={{ margin: 0 }} ref={calendarRef}></div>
                  </div>
                  <div>
                    <Skeleton variant="text" width={300} height={30} />
                  </div>
                  <div>
                    {' '}
                    <Skeleton variant="text" width={300} height={30} />
                  </div>
                  <div>
                    <Skeleton variant="text" width={130} height={30} />
                    <Skeleton variant="text" width={130} height={30} />
                    <Skeleton variant="text" width={130} height={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Skeleton variant="text" width={400} height={30} />
            <div style={{ display: 'flex' }}>
              <Skeleton variant="text" width={90} height={30} />
              <div style={{ margin: '0 15px 0 15px' }}>
                <Skeleton variant="text" width={90} height={30} />
              </div>

              <Skeleton variant="text" width={90} height={30} />
            </div>
            <Skeleton variant="text" width={`100%`} height={800} />
          </div>
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
        </DetailContainer>
      </div>
    );
  }

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
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
              <TopBox>
                <h1>{storeData.title}</h1>
                <BookMark storeData={storeData} />
              </TopBox>
              <div className="store-body">
                <div>{storeData.body}</div>
              </div>
              <div style={{ position: 'relative', fontSize: '18px' }} className="store-text">
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 15px 0', fontSize: '18px' }}>
                  <span>위치</span> {storeData.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0', fontSize: '18px' }}>
                  <span>기간</span> {storeData.period_start} ~ {storeData.period_end}
                  <div
                    style={{ display: 'flex', alignItems: 'center', margin: '0', fontSize: '18px' }}
                    ref={calendarRef}
                  >
                    <CalendarIcon onClick={handleMouseEnter} />
                    <CalendarClickInfo>← click !</CalendarClickInfo>
                    <CalendarBox>{isClicked && <Calendar storeData={storeData} />}</CalendarBox>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0', fontSize: '18px' }}>
                  <span>운영 시간</span> {storeData.opening}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0', fontSize: '18px' }}>
                  <span>예약 여부</span> {storeData.reservation ? '있음' : '없음'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0', fontSize: '18px' }}>
                  <span>링크 </span>
                  <p onClick={() => handleopenlink(storeData.link)}>Visit the official page</p>
                  <CopyToClipboard
                    text={storeData.link}
                    onCopy={() =>
                      toast.info('주소가 복사되었습니다. 공식 페이지에서 더 자세한 정보를 확인하실 수 있습니다! :)', {
                        className: 'custom-toast',
                        theme: 'light'
                      })
                    }
                  >
                    <LinkIcon />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="button-box">
                <button
                  style={{ fontWeight: '600', margin: '10px 5px', padding: '14px 25px' }}
                  onClick={() => navigate('/review', { state: { storeId: id } })}
                >
                  후기 보러가기
                </button>
                <button
                  style={{ fontWeight: '600', margin: '10px 15px', padding: '14px 25px' }}
                  onClick={() => navigate('/mate', { state: { storeId: id } })}
                >
                  팝업 메이트 구하기
                </button>
                <ShareBtn
                  style={{ margin: '10px 5px' }}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <IosShareIcon fontSize="small" />
                </ShareBtn>
                <ShareMenu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <ShareInfo>팝업스토어 정보 공유하기</ShareInfo>
                  <Share storeData={storeData} onClick={handleClose} />
                </ShareMenu>
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
  /* min-width: 800px; */
  min-width: 764px;
  width: 50%;
  height: 100%;
  margin: 90px auto;

  .store-detail {
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
      width: 100%;
      /* width: 620px; */
      height: auto;
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
        width: 100%;
        height: auto;
        border-bottom: 2px dashed #65656587;
        margin-bottom: 10px;

        div {
          max-height: 100px;
          min-height: 80px;

          font-size: 18px;
          line-height: 26px;
          overflow: auto;
          margin: 20px 0;
          padding: 0 25px 0 5px;
        }
      }

      .store-text {
        width: 620px;
        /* width: 100%; */
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 5px;

        span {
          font-size: 18px;
          font-weight: 600;
          margin-right: 12px;
        }

        p {
          text-decoration: underline;
          cursor: pointer;
          margin-right: 15px;
          &:hover {
            color: var(--primary-color);
          }
        }
      }

      button {
        padding: 13px;
      }

      .button-box {
        display: flex;
        align-items: center;
      }
    }
  }

  @media (max-width: 2200px) {
    .store-detail {
      width: 100%;
      flex-direction: column;
      gap: 80px;
      margin: 120px auto;

      .image-slider {
        width: 100%;
      }

      .store-info {
        display: flex;
        justify-content: center;
        align-items: center;
        /* text-align: left; */
        text-align: center;

        .store-body {
          width: 95%;
          display: flex;
          justify-content: center;
          align-items: center;

          div {
            width: 90%;
          }
        }

        .store-text {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-box {
          margin-top: 20px;
        }
      }
    }
  }
`;

const TopBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 2200px) {
    /* flex-direction: row; */
    justify-content: center;
    align-items: center;
  }
`;

const ShareBtn = styled.button`
  background-color: #fff;
  color: var(--fifth-color);
  padding: 14px 25px !important;
`;

const LinkIcon = styled(InsertLinkIcon)`
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
    transform: scale(1.1);
  }
`;

const CalendarIcon = styled(CalendarMonthIcon)`
  margin: 0 7px 0 15px;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
    transform: scale(1.1);
  }
`;

const CalendarClickInfo = styled.div`
  animation: blink 5s infinite; /* 깜빡거리는 애니메이션 적용 */

  @keyframes blink {
    0% {
      opacity: 1; /* 시작 시 fully visible */
    }
    50% {
      opacity: 0; /* 중간에 투명 */
    }
    100% {
      opacity: 1; /* 다시 fully visible */
    }
  }
`;

const CalendarBox = styled.div`
  position: absolute;
  top: 40%;
  z-index: 3; /* 다른 요소 위에 나타나도록 설정 */
`;

const ShareMenu = styled(Menu)`
  .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
    border-radius: 18px;
    padding: 15px 22px;
    margin-top: 10px;
  }

  .css-6hp17o-MuiList-root-MuiMenu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }
`;

const ShareInfo = styled.div`
  margin-bottom: 15px;
  font-weight: 600;
`;
