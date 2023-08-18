import React, { useEffect, useRef } from 'react';

interface StoreDetailProps {
  storeLocation: string;
}

const StoreMap = ({ storeLocation }: StoreDetailProps) => {
  //  ref는 맵이 렌더링될 DOM 요소를 참조
  const mapElement = useRef(null);

  useEffect(() => {
    // 이 코드는 window 전역 객체에서 naver 객체를 구조 분해
    // naver 객체는 Naver Maps API가 제공하는 기능(= maps.Service.geocode, maps.LatLng)에 접근하기 위해 사용
    const { naver } = window;

    // 주소를 좌표로 변환
    naver.maps.Service.geocode({ query: storeLocation }, function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        if (!storeLocation) {
          return alert('Geocode Error, Please write address');
        }
        return alert('Geocode Error, address:' + storeLocation);
      }

      // Geocoding 데이터 객체
      const items = response.v2.addresses[0];

      const latitude = Number(items.y);
      const longitude = Number(items.x);

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

      // Map 객체 생성
      const map = new naver.maps.Map(mapElement.current, mapOptions);

      //지도상에 핀 표시 할 부분
      new naver.maps.Marker({
        position: location,
        map
      });
    });
  }, [storeLocation]);

  // 지도 DOM 요소 지정하기
  return <div ref={mapElement} style={{ width: '800px', height: '400px' }} />;
};

export default StoreMap;
