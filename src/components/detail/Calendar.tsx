import React, { useState } from 'react';
// 라이브러리
import moment from 'moment';
// 타입
import { CalendarProps } from '../../types/props';
// 스타일
import { St } from './style/St.Calendar';

const Calendar = ({ storeData }: CalendarProps) => {
  const [period, setPeriod] = useState([storeData.period_start, storeData.period_end]);

  // 팝업스토어 기간 지정 onChange
  const onChangeCalendar = (date: any) => {
    setPeriod([date, date]);
  };

  // 캘린더 클릭 방지 함수
  const tileDisabled = (date: any) => {
    return true;
  };

  return (
    <St.StyleCalendar
      calendarType="gregory"
      locale="ko-KO"
      onChange={onChangeCalendar}
      selectRange={true}
      value={[period[0], period[1]]}
      formatDay={(locale, date) => moment(date).format('D')}
      next2Label={null}
      prev2Label={null}
      tileDisabled={tileDisabled}
    />
  );
};

export default Calendar;
