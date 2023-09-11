import React, { useEffect, useRef, useState } from 'react';
// 라이브러리
import { styled } from 'styled-components';
// 타입
import { Geocoder, HotPlaceInfo, Store } from '../../types/types';
import { StoreMapProps } from '../../types/props';
// 컴포넌트
import HotPlace from './HotPlace';
import NearbyStore from './NearbyStore';
//alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const StoreMap = ({ storeLocation, title }: StoreMapProps) => {
  const [guName, setGuName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [hImageSrc, setHImageSrc] = useState<string>('');
  const [searchData, setSearchData] = useState<HotPlaceInfo[]>();
  const [isSelected, setIsSelected] = useState<HotPlaceInfo | undefined>();
  const [nearbyStoreMarker, setNearbyStoreMarker] = useState<Store[] | undefined>();

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

        const location = result[0].road_address.address_name;
        setGuName(result[0].road_address.region_2depth_name);

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

        // 장소 검색 객체를 생성
        const ps = new kakao.maps.services.Places();

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);

        // 장소검색이 완료됐을 때 호출되는 콜백함수
        const placesSearchCB = async (data: HotPlaceInfo[], status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
            // LatLngBounds 객체에 좌표를 추가
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
            toast.info('검색 결과가 존재하지 않습니다. :(', {
              className: 'custom-toast',
              theme: 'light'
            });
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            toast.info('검색 결과 중 오류가 발생했습니다. :(', {
              className: 'custom-toast',
              theme: 'light'
            });
            return;
          }
        };

        // 키워드로 장소를 검색
        for (let i = 1; i < 3; i++) {
          ps.keywordSearch(`${location} ${category}`, placesSearchCB, {
            location: coords,
            radius: 800,
            size: 15,
            page: i
          });
        }

        const displayMarker = (place: HotPlaceInfo) => {
          if (category && category === '맛집') {
            setHImageSrc('/asset/rMarker.png');
          } else if (category && category === '카페') {
            setHImageSrc('/asset/cMarker.png');
          } else if (category && category === '술집') {
            setHImageSrc('/asset/bMarker.png');
          }

          // 마커이미지의 크기
          const imageSize = new kakao.maps.Size(30, 40);
          const hpMarkerImage = new kakao.maps.MarkerImage(hImageSrc, imageSize);

          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
            image: hpMarkerImage,
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          });

          kakao.maps.event.addListener(marker, 'click', function () {
            setIsSelected(place);
          });

          // 핫플레이스 커스텀 인포윈도우
          const hotPlaceCustomOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(place.y, place.x),
            content: `<div class='customoverlay-nearby'>${place.place_name}</div>`,
            yAnchor: 2
          });

          // 핫플레이스 마커에 클릭이벤트를 등록
          kakao.maps.event.addListener(marker, 'click', function () {
            setIsSelected(place);

            // console.log('isSelected ===>', isSelected);
          });

          // // 핫플레이스 마커에 클릭이벤트를 등록
          // kakao.maps.event.addListener(marker, 'click', function () {
          //   if (isSelected?.id !== place.id) {
          //     kakao.maps.event.removeListener(map, 'click', customOverlay.setMap(null));
          //   }

          //   // 커스텀 인포윈도우 on
          //   customOverlay.setMap(map);
          //   setIsSelected(place);
          //   console.log('isSelected ===>', isSelected);

          //   console.log('isSelected ===>', isSelected);
          // });

          // // 핫플레이스 마커에 마우스아웃 이벤트
          // kakao.maps.event.addListener(marker, 'mouseout', function () {
          //   // 커스텀 인포윈도우 off
          //   customOverlay.setMap(null);
          // });
        };

        // 메인 마커이미지의 주소
        const imageSrc = '/asset/mainMarker.png';

        // 메인 마커이미지의 크기
        const imageSize = new kakao.maps.Size(80, 85);

        // 메인 마커이미지의 옵션 // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // const imageOption = { offset: new kakao.maps.Point(40, 70) };

        // 메인 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const mainMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: mainMarkerImage,
          clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          // zIndex: 9
        });

        // 메인 커스텀 인포윈도우
        const mainCustomOverlay = new kakao.maps.CustomOverlay({
          position: coords,
          content: `<div class='customoverlay'>${title}</div>`,
          yAnchor: 3.2
        });

        // 마커에 마우스오버 이벤트
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          // 메인 커스텀 인포윈도우 on
          mainCustomOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          // 메인 커스텀 인포윈도우 off
          mainCustomOverlay.setMap(null);
        });

        // 지도 타입 컨트롤
        const mapTypeControl = new kakao.maps.MapTypeControl();
        // 지도 타입 컨트롤의 위치
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 줌 컨트롤
        const zoomControl = new kakao.maps.ZoomControl();
        // 지도 줌 컨트롤 위치
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // nearbyStore 마커
        if (nearbyStoreMarker) {
          const geocoder = new kakao.maps.services.Geocoder();

          nearbyStoreMarker.forEach((data) => {
            geocoder.addressSearch(data.location, function (result: Geocoder[], status: string) {
              // 정상적으로 검색이 완료됐으면
              if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
                // nearbyStore 마커이미지의 주소
                const imageSrc = '/asset/nearbyMarker.png';
                // nearbyStore 마커이미지의 크기
                const imageSize = new kakao.maps.Size(55, 60);
                const nearbyMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                const marker = new kakao.maps.Marker({
                  map: map,
                  position: coords,
                  image: nearbyMarkerImage,
                  clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
                });
                // };

                // nearbyStore 커스텀 인포윈도우
                const nearCustomOverlay = new kakao.maps.CustomOverlay({
                  position: coords,
                  content: `<div class='customoverlay-nearby'>${data.title}</div>`,
                  yAnchor: 2.5
                });

                // nearbyStore 마커에 마우스오버 이벤트
                kakao.maps.event.addListener(marker, 'mouseover', () => {
                  // 커스텀 인포윈도우 on
                  nearCustomOverlay.setMap(map);
                });

                // nearbyStore 마커에 마우스아웃 이벤트
                kakao.maps.event.addListener(marker, 'mouseout', function () {
                  // 커스텀 인포윈도우 off
                  nearCustomOverlay.setMap(null);
                });
              }
            });
          });
        }
      }
    });
  }, [storeLocation, category, hImageSrc, nearbyStoreMarker]);

  return (
    <MapContainer>
      {searchData && <HotPlace category={category} setCategory={setCategory} setIsSelected={setIsSelected} />}
      <div className="map-iframe">
        {isSelected && category && <iframe src={`https://place.map.kakao.com/m/${isSelected.id}`} />}
        <KaKaoMap ref={mapElement} isSelected={isSelected} category={category} />
      </div>
      <NearbyStore guName={guName} setNearbyStoreMarker={setNearbyStoreMarker} />
    </MapContainer>
  );
};

export default StoreMap;

const MapContainer = styled.div`
  width: 100%;

  .info-title {
    position: absolute;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(118, 129, 168);
    z-index: 0;
    display: block;
    width: 207px;
    height: 23px;
    cursor: default;
  }

  .map-iframe {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 15px;

    .customoverlay {
      text-align: center;
      color: #fff;
      font-weight: 600;
      background-color: var(--fifth-color);
      border: 3px solid var(--fifth-color);
      border-radius: 18px;
      padding: 10px 20px;
    }

    .customoverlay-nearby {
      text-align: center;
      color: var(--fifth-color);
      font-weight: 600;
      background-color: #fff;
      border: 3px solid var(--fifth-color);
      border-radius: 18px;
      padding: 10px 20px;
    }

    iframe {
      width: 38%;
      height: 600px;
      border-radius: 10px;
      border: 3px solid #333333;
    }
  }

  @media (max-width: 1800px) {
    .map-iframe {
      iframe {
        width: 48%;
      }
    }
  }
`;

const KaKaoMap = styled.div<{ isSelected: HotPlaceInfo | undefined; category: string }>`
  width: ${(props) => (props.isSelected && props.category ? '60%' : '100%')};
  height: 600px;
  border-radius: 10px;
  border: 3px solid #333333;

  @media (max-width: 1800px) {
    width: ${(props) => (props.isSelected && props.category ? '48%' : '100%')};
  }
`;
