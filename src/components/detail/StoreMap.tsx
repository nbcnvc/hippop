import React, { useEffect, useRef } from 'react';

interface StoreDetail {
  latitude: number;
  longitude: number;
}

const StoreMap = ({ latitude, longitude }: StoreDetail) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 로케이션 표시 : 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(latitude, longitude);

    //네이버 지도 옵션 선택
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    //지도상에 핀 표시 할 부분
    new naver.maps.Marker({
      position: location,
      map
    });
  }, []);

  return <div ref={mapElement} style={{ minHeight: '400px' }} />;
};

export default StoreMap;
