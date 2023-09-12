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
import IosShareIcon from '@mui/icons-material/IosShare';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from '@mui/material';
// 스타일
import { St } from './style/St.StoreDetail';

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
        <St.DetailContainer>
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
        </St.DetailContainer>
      </div>
    );
  }

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  return (
    <St.DetailContainer>
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
              <St.TopBox>
                <h1>{storeData.title}</h1>
                <BookMark storeData={storeData} />
              </St.TopBox>
              <div className="store-body">
                <div>{storeData.body}</div>
              </div>
              <div style={{ position: 'relative', fontSize: '18px' }} className="store-text">
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 15px 0', fontSize: '18px' }}>
                  <span>위치</span> {storeData.location}
                  <CopyToClipboard
                    text={storeData.location}
                    onCopy={() =>
                      toast.info('주소가 복사되었습니다!', {
                        className: 'custom-toast',
                        theme: 'light'
                      })
                    }
                  >
                    <St.LocationIcon />
                  </CopyToClipboard>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0', fontSize: '18px' }}>
                  <span>기간</span> {storeData.period_start} ~ {storeData.period_end}
                  <div
                    style={{ display: 'flex', alignItems: 'center', margin: '0', fontSize: '18px' }}
                    ref={calendarRef}
                  >
                    <St.CalendarIcon onClick={handleMouseEnter} />
                    <St.CalendarClickInfo>← click !</St.CalendarClickInfo>
                    <St.CalendarBox>{isClicked && <Calendar storeData={storeData} />}</St.CalendarBox>
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
                      toast.info('주소가 복사되었습니다. 공식 페이지에서 더 자세한 정보를 확인하실 수 있습니다!', {
                        className: 'custom-toast',
                        theme: 'light'
                      })
                    }
                  >
                    <St.LinkIcon />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="button-box">
                <button
                  style={{ fontWeight: '600', margin: '10px 5px', padding: '14px 25px' }}
                  onClick={() => navigate('/review', { state: { storeId: id, storeTitle: storeData.title } })}
                >
                  후기 보러가기
                </button>
                <button
                  style={{ fontWeight: '600', margin: '10px 15px', padding: '14px 25px' }}
                  onClick={() => navigate('/mate', { state: { storeId: id, storeTitle: storeData.title } })}
                >
                  팝업 메이트 구하기
                </button>
                <St.ShareBtn
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <IosShareIcon fontSize="small" />
                </St.ShareBtn>
                <St.ShareMenu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <St.ShareInfo>팝업스토어 정보 공유하기</St.ShareInfo>
                  <Share storeData={storeData} onClick={handleClose} />
                </St.ShareMenu>
              </div>
            </div>
          </div>
          <StoreMap storeLocation={storeData.location} title={storeData.title} />
        </>
      )}
    </St.DetailContainer>
  );
};

export default StoreDetail;
