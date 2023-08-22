import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchHotPlaceInfo, fetchHotPlaceImg, fetchHotPlaceData } from '../../api/store';

import { HotPlaceProps } from '../../types/props';

const HotPlace = ({ guName }: HotPlaceProps) => {
  // const { data: HotPlaceInfo, isLoading, isError } = useQuery({ queryKey: ['hotPlace'], queryFn: fetchHotPlaceInfo });

  // const {
  //   data: HotPlaceImgData,
  //   isLoading: isLoadingImgData,
  //   isError: isErrorImgData
  // } = useQuery({ queryKey: ['hotPlaceImg'], queryFn: fetchHotPlaceImg });

  // console.log('HotPlaceInfo', HotPlaceInfo);
  // console.log('HotPlaceImgData', HotPlaceImgData);

  const {
    data: HotPlaceData,
    isLoading,
    isError
  } = useQuery({ queryKey: ['hotPlaceData'], queryFn: fetchHotPlaceData });

  console.log('HotPlaceData', HotPlaceData);

  // const filteredAddresses = HotPlaceData?.filter((item: any) => item.NEW_ADDRESS.includes('영등포구'))

  // console.log('filteredAddresses', filteredAddresses);

  // const filteredAddresses = HotPlaceImgData?.filter((item: any) => item.RSTR_NM === HotPlaceData?.POST_SJ);
  //
  // console.log('filteredAddresses', filteredAddresses);

  // console.log(HotPlaceImgData);

  if (isLoading) {
    <div>로딩중입니다...</div>;
  }

  if (isError) {
    <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: '600' }}>이 주변 핫플레이스를 추천해드립니다 !</div>
      {HotPlaceData?.map((data: any, index: number) => {
        return <div key={index}>{data.title}</div>;
      })}
    </div>
  );
};

export default HotPlace;
