import React, { ReactEventHandler, SetStateAction } from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';
import { HotPlaceInfo } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
// api
// import { fetchHotPlaceData } from '../../api/store';

const HotPlace = ({ setCategory, setIsShow, hotPlaceData }: HotPlaceProps) => {
  // const { data: hotPlaceImgData, isLoading, isError } = useQuery(['hotPlaceImg'], () => {hotPlaceData?.map((data) => )});

  // const {
  //   data: hotPlaceImgData,
  //   isLoading,
  //   isError
  // } = useQuery(['hotPlaceImg'], () => fetchHotPlaceData(hotPlaceData[0].place_name));
  // console.log(hotPlaceData);

  // console.log(hotPlaceImgData);

  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
  };

  const handleShowMarker = () => {
    setIsShow((prev) => !prev);
  };

  // if (isLoading) {
  //   return <div>로딩중입니다 ...</div>;
  // }
  // if (isError) {
  //   return <div>오류가 발생했습니다 ...</div>;
  // }

  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600', marginTop: '50px' }}>팝업 스토어 주변 핫플레이스 추천 !</div>
      <div style={{ marginTop: '20px' }}>
        <button name="맛집" onClick={handleHotPlaceCategory}>
          맛집
        </button>
        <button name="카페" onClick={handleHotPlaceCategory}>
          카페
        </button>
        <button name="술집" onClick={handleHotPlaceCategory}>
          술집
        </button>
      </div>
      <button onClick={handleShowMarker}>지도로 위치 확인해보기</button>
      <div>
        {hotPlaceData?.map((data: HotPlaceInfo) => {
          return <div key={data.id}>{data.place_name}</div>;
        })}
      </div>
      {/* {hotPlaceImgData.map((data: any) => {
        return (
          <div>
            <img src={data.image_url} />
          </div>
        );
      })} */}
      {/* <img src={hotPlaceImgData[1].thumbnail_url} /> */}
    </div>
  );
};

export default HotPlace;
