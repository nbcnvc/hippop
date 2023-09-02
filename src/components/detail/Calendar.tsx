import React, { useState } from 'react';
// 라이브러리
import Calendar1 from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
// props타입
import { CalendarProps } from '../../types/props';
//스타일
import { styled } from 'styled-components';

const Calendar = ({ storeData }: CalendarProps) => {
  const [period, setPeriod] = useState([storeData.period_start, storeData.period_end]);

  const onChangeCalendar = (date: any) => {
    setPeriod([date, date]);
  };

  return (
    <StyleCalendar
      calendarType="gregory"
      locale="ko-KO"
      onChange={onChangeCalendar}
      selectRange={true}
      value={[period[0], period[1]]}
      formatDay={(locale, date) => moment(date).format('D')}
      next2Label={null}
      prev2Label={null}
    />
  );
};

export default Calendar;

const StyleCalendar = styled(Calendar1)`
  position: absolute;
  top: 40%;
  right: -10%;
  width: 330px;
  border: 3px solid var(--fifth-color);
  border-radius: 22px 18px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);

  .react-calendar {
    background-color: #fff;
    color: var(--fifth-color);
  }
  .react-calendar__navigation {
    background: var(--primary-color);
    border-bottom: 3px solid var(--fifth-color);
    border-radius: 19px 15px 0 0;
  }
  .react-calendar__navigation button {
    color: #fff;
    min-width: 100px;
    background: none;
    font-size: 18px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: var(--sixth-color);
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__tile {
    color: #555555;

    max-width: 100%;
    padding: 10px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__month-view__days {
    padding: 5px 3px;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #be0000;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: var(--first-color);
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background-color: var(--sixth-color);
    border-radius: 6px;
    font-weight: bold;
    color: #000000;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #5048eb4b;
    border-radius: 6px;
    font-weight: bold;
    color: var(--first-color);
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: var(--sixth-color);
  }
  .react-calendar__tile--active {
    background-color: var(--sixth-color);
    border-radius: 4px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: var(--sixth-color);
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f9fdc2;
    color: #000000;
    /* border-bottom-left-radius: 20px; */
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: var(--third-color);
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: var(--third-color);
    color: white;
  }
`;
