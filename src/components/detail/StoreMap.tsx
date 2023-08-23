import React, { useEffect, useRef, useState } from 'react';
// 타입
import { Geocoder, HotPlaceInfo, HotPlaceImage, HotPlaceData } from '../../types/types';
import { StoreMapProps } from '../../types/props';
// api
import { Kakao } from '../../api/store';
// 컴포넌트
import HotPlace from './HotPlace';
import NearbyStore from './NearbyStore';

declare global {
  interface Window {
    kakao: any;
  }
}

const StoreMap = ({ storeLocation }: StoreMapProps) => {
  const [category, setCategory] = useState<string>('맛집');
  const [hotPlaceData, setHotPlaceData] = useState<HotPlaceData[]>();
  const [isShow, setIsShow] = useState<boolean>(false);

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
        const placesSearchCB = async (data: HotPlaceInfo[], status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();

            if (isShow) {
              for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }
            }
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);

            // // data -> 15개
            // const promiseArr = [];
            // data.forEach((place) => {
            //   promiseArr.push(
            //     kakao.get(`v2/search/image?target=title&query=${place.place_name}&page=1`)
            //     // await kakao.get(`v2/search/image?target=title&query=${place.place_name}&page=1`)
            //   )
            // })

            // const response = await Promise.all(promiseArr);

            const hotPlaceDataArr = data.map(async (hotPlace) => {
              const response = await Kakao.get(
                // `v2/search/image?sort=accuracy&target=title&query=${hotPlace.place_name}&page=1&size=20`
                // `v2/search/blog?sort=accuracy&page=1&size=5&query=${hotPlace.place_name}`
                `v2/search/image?sort=accuracy&page=1&size=10&query=${hotPlace.place_name}`
              );
              return {
                id: hotPlace.id,
                category_code: hotPlace.category_group_code,
                category_name: hotPlace.category_group_name,
                place_name: hotPlace.place_name,
                images: response.data.documents.map((document: HotPlaceImage) => document.thumbnail_url)
              };
            });

            const response = await Promise.all(hotPlaceDataArr);
            console.log(response);

            setHotPlaceData(response);
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

        const displayMarker = (place: HotPlaceInfo) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
          });
        };

        // 마커이미지의 주소입니다
        const imageSrc = 'https://i.postimg.cc/pX2LSM9r/1.png';
        // 마커이미지의 크기입니다
        const imageSize = new kakao.maps.Size(70, 75);
        // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        const imageOption = { offset: new kakao.maps.Point(30, 60) };
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage
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
  }, [storeLocation, category, isShow]);

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
      <NearbyStore />
      {hotPlaceData && <HotPlace setCategory={setCategory} setIsShow={setIsShow} hotPlaceData={hotPlaceData} />}
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
