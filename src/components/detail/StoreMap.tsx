import React, { useEffect, useRef } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { StoreMapProps } from '../../types/props';

declare global {
  interface Window {
    kakao: any;
  }
}

const StoreMap = ({ storeLocation }: StoreMapProps) => {
  //  ref는 맵이 렌더링될 DOM 요소를 참조
  const mapElement = useRef(null);

  useEffect(() => {
    // 주소를 좌표로 변환하는 geocoder 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(storeLocation, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

        // console.log('coords', coords.La);

        // 지도 옵션
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapElement.current, mapOption);

        // 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명 표시
        const infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">현재 팝업스토어 위치</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div>
      <div
        ref={mapElement}
        style={{
          width: '80%',
          height: '450px',
          margin: '70px 0'
        }}
      />
    </div>
  );
};

export default StoreMap;

// 고려해볼 기능
// 지도 정보 얻어오기
// geolocation으로 마커 표시하기
// 여러개 마커 표시하기
// 여러개 마커 제어하기
// 다양한 이미지 마커 표시하기
// 닫기가 가능한 커스텀 오버레이
// 키워드로 장소검색하기
