import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// 타입
import { NearbyStoreProps } from '../../types/props';
// api
import { fetchStoreData } from '../../api/store';
// 라이브러리
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NearbyStore = ({ guName, setIsShowSMarker }: NearbyStoreProps) => {
  const params = useParams();

  const { data: storeData, isLoading, isError } = useQuery({ queryKey: ['nearbyStore'], queryFn: fetchStoreData });

  const handleShowMarker = () => {
    setIsShowSMarker((prev) => !prev);
  };

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600', marginTop: '50px' }}>{guName}의 다른 팝업스토어는 어때요?</div>
      <div>
        <button onClick={handleShowMarker}>지도로 위치 확인해보기</button>
      </div>

      {storeData
        ?.filter((data) => data.location.includes(guName) && data.id !== Number(params.id))
        .map((data) => {
          return (
            <div style={{ display: 'inline-block', margin: '10px', flexDirection: 'column' }} key={data.id}>
              <img
                style={{ width: '300px' }}
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.images[0]}`}
                alt={`${data.title} 이미지`}
              />
              <div>{data.title}</div>
            </div>
          );
        })}
    </div>
  );
};

export default NearbyStore;
