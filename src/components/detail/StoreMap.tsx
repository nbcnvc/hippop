import React, { useEffect, useRef, useState } from 'react';
// 타입
import { Geocoder, HotPlaceInfo, Store } from '../../types/types';
import { StoreMapProps } from '../../types/props';
// 컴포넌트
import HotPlace from './HotPlace';
import NearbyStore from './NearbyStore';
// 스타일
import { styled } from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const StoreMap = ({ storeLocation }: StoreMapProps) => {
  const [guName, setGuName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [searchData, setSearchData] = useState<HotPlaceInfo[]>();
  const [isSelected, setIsSelected] = useState<HotPlaceInfo | undefined>();
  const [nearbyStoreMarker, setNearbyStoreMarker] = useState<Store[] | undefined>();
  // const [isShowSMarker, setIsShowSMarker] = useState<boolean>(true);

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

        const dongName = result[0].address.region_3depth_h_name;
        setGuName(result[0].address.region_2depth_name);

        // 지도 옵션
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

        if (!mapElement.current || !kakao) {
          return false;
        }

        // 지도 생성
        const map = new window.kakao.maps.Map(mapElement.current, mapOption);

        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places();

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);

        // 장소검색이 완료됐을 때 호출되는 콜백함수
        const placesSearchCB = async (data: HotPlaceInfo[], status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();

            if (category) {
              for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }

              map.setBounds(bounds);
            }
            setSearchData(data);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
          }
        };

        // 키워드로 장소를 검색합니다
        for (let i = 1; i < 3; i++) {
          ps.keywordSearch(`${dongName} ${category}`, placesSearchCB, { size: 15, page: i });
        }

        const displayMarker = (place: HotPlaceInfo) => {
          // 메인 마커이미지의 주소
          const imageSrc = '/asset/hotPlaceMarker.png';
          // 마커이미지의 크기
          const imageSize = new kakao.maps.Size(45, 50);
          const hpMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
            image: hpMarkerImage,
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function () {
            // 마커 위에 인포윈도우를 표시합니다
            setIsSelected(place);
          });
        };

        // 메인 마커이미지의 주소
        const imageSrc = '/asset/mainMarker.png';
        // 마커이미지의 크기
        const imageSize = new kakao.maps.Size(100, 105);
        // 마커이미지의 옵션 // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // const imageOption = { offset: new kakao.maps.Point(40, 70) };
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const mainMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: mainMarkerImage,
          clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });

        // 인포윈도우로 장소에 대한 설명 표시
        const infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;z-index:1;">현재 팝업스토어 위치</div>'
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

        // nearbyStore marker
        if (nearbyStoreMarker) {
          const geocoder = new kakao.maps.services.Geocoder();

          nearbyStoreMarker.forEach((data) => {
            geocoder.addressSearch(data.location, function (result: Geocoder[], status: string) {
              // 정상적으로 검색이 완료됐으면
              if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

                // console.log('result', result);

                // const displayMarker = (place: Geocoder) => {
                // 메인 마커이미지의 주소
                const imageSrc = '/asset/nearbyMarker.png';
                // // 마커이미지의 크기
                const imageSize = new kakao.maps.Size(50, 55);
                const nearbyMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                const marker = new kakao.maps.Marker({
                  map: map,
                  position: coords,
                  image: nearbyMarkerImage,
                  clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                });
                // };

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                // const bounds = new kakao.maps.LatLngBounds();

                // for (let i = 0; i < result.length; i++) {
                //   displayMarker(result[i]);
                //   bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x));
                // }

                // map.setBounds(bounds);
              }
            });
          });
        }
      }
    });
  }, [storeLocation, category, nearbyStoreMarker]);

  console.log(nearbyStoreMarker);

  return (
    <div>
      {searchData && <HotPlace setCategory={setCategory} setIsSelected={setIsSelected} />}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
        {isSelected && category && <IframeStyle src={`https://place.map.kakao.com/m/${isSelected.id}`} />}
        <div
          ref={mapElement}
          style={{
            width: `${isSelected && category ? '55%' : '90%'}`,
            height: '550px',
            borderRadius: '10px',
            border: '1px solid #c9c9c9ff'
          }}
        />
      </div>
      <NearbyStore guName={guName} setNearbyStoreMarker={setNearbyStoreMarker} />
    </div>
  );
};

export default StoreMap;

const IframeStyle = styled.iframe`
  width: 33%;
  height: 550px;
  margin-right: 20px;
  border-radius: 10px;
  border: 1px solid #c9c9c9ff;
`;
