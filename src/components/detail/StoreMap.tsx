import React, { useEffect, useRef, useState } from 'react';
// 타입
import { StoreMapProps } from '../../types/props';
// 컴포넌트
import HotPlace from './HotPlace';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Geocoder {
  address: AddressInfo;
  address_name: string;
  address_type: string;
  road_address: RoadAddress;
  x: string;
  y: string;
}

interface AddressInfo {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
}

interface RoadAddress {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  x: string;
  y: string;
  zone_no: string;
}

const StoreMap = ({ storeLocation }: StoreMapProps) => {
  const [category, setCategory] = useState<string>('맛집');
  const [hotPlaceData, setHotPlaceData] = useState<any>(null);

  //  ref는 맵이 렌더링될 DOM 요소를 참조
  const mapElement = useRef(null);

  const { kakao } = window;

  useEffect(() => {
    // 주소를 좌표로 변환하는 geocoder 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(storeLocation, function (result: Geocoder[], status: string) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

        // console.log(result[0].road_address.road_name);

        // 지도 옵션
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapElement.current, mapOption);

        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places();

        // 장소검색이 완료됐을 때 호출되는 콜백함수
        const placesSearchCB = (data: any, status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();

            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);

            console.log('data', data);
            setHotPlaceData(data);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
          }
        };

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(`${result[0].road_address.road_name} ${category}`, placesSearchCB);

        const displayMarker = (place: any) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
          });
        };

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

        // 지도 타입 컨트롤
        const mapTypeControl = new kakao.maps.MapTypeControl();
        // 지도 타입 컨트롤의 위치
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 줌 컨트롤
        const zoomControl = new kakao.maps.ZoomControl();
        // 지도 줌 컨트롤 위치
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  }, [category]);

  return (
    <div>
      <div
        ref={mapElement}
        style={{
          width: '80%',
          height: '450px',
          marginTop: '70px'
        }}
      />
      <HotPlace setCategory={setCategory} />
      {hotPlaceData?.map((data: any) => {
        return <div key={data.id}>{data.place_name}</div>;
      })}
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
