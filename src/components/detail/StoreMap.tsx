import React, { useEffect } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { StoreMapProps } from '../../types/props';

const StoreMap = ({ storeLocation }: StoreMapProps) => {
  console.log(storeLocation);

  var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  let geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });

  // useEffect(() => {
  //   let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  //   let options = {
  //     //지도를 생성할 때 필요한 기본 옵션
  //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //     level: 3 //지도의 레벨(확대, 축소 정도)
  //   };

  //   let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  // }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 37.60683,
          lng: 127.016358
        }}
        style={{
          width: '80%',
          height: '450px',
          margin: '70px 0'
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 37.60683,
            lng: 127.016358
          }}
        />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
      </Map>
    </>
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
