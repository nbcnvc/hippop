import React, { useState } from 'react';
// 라이브러리
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getMonth, getYear } from 'date-fns';
// 타입
import { SearchCalendarProps } from '../../../types/props';
// 스타일
import { styled } from 'styled-components';
// mui

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';

const SearchCalendar = ({ onSearch }: SearchCalendarProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const YEARS = Array.from({ length: getYear(new Date()) + 1 - 2000 }, (_, i) => getYear(new Date()) - i);
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const handleStartDateChange = (date: Date) => {
    if (endDate < date) {
      alert('종료일 보다 클 수는 없어요~ ');
      setEndDate(date);
      setStartDate(date);
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate > date) {
      alert('시작일 보다 작을 수는 없어요~.');
    } else {
      setEndDate(date);
    }
  };

  const handleSearch = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    onSearch(startDate, endDate);
  };
  return (
    <Container>
      {/* <div>기간별</div> */}
      <StartDateBox>
        {/* <CalendarMonthOutlinedIcon /> */}
        <StyledDatePicker // DatePicker의 styled-component명
          locale={ko} //한글
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          onChange={handleStartDateChange}
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <CalanderContainer>
              <DirectBtn type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {'<'}
              </DirectBtn>
              <Month>{MONTHS[getMonth(date)]}</Month>
              <Year value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Year>
              <div>
                <DirectBtn type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {'>'}
                </DirectBtn>
              </div>
            </CalanderContainer>
          )}
        />
      </StartDateBox>
      <Ptag>~</Ptag>
      <EndDateBox>
        {/* <CalendarMonthOutlinedIcon /> */}
        <StyledDatePicker
          locale={ko} //한글
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          onChange={handleEndDateChange}
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          useWeekdaysShort={true}
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <CalanderContainer>
              <DirectBtn type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {/* <LeftArrow fill="#ffffff" /> */}
                {'<'}
              </DirectBtn>
              <Month>{MONTHS[getMonth(date)]}</Month>
              <Year value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Year>
              <div>
                <DirectBtn type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {/* <RightArrow fill="#ffffff" /> */}
                  {'>'}
                </DirectBtn>
              </div>
            </CalanderContainer>
          )}
        />
        <SearchBtn onClick={handleSearch}>
          <SearchPeriodBtn />
        </SearchBtn>
      </EndDateBox>
    </Container>
  );
};

export default SearchCalendar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  margin-bottom: 160px;
`;

const StartDateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const Ptag = styled.p`
  margin: 10px;
`;
const EndDateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const SearchBtn = styled.button`
  margin-left: 10px;
  background-color: #2b3467;
`;

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 18px;

  border: 2px solid black;

  width: 200px;
  height: 43px;

  font-size: 15px;

  /* 일요일 날짜: 빨간색 */
  .fc-day-sun a {
    color: red;
  }

  /* 토요일 날짜: 파란색 */
  .fc-day-sat a {
    color: blue;
  }
`;

const CalanderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
  align-items: center;

  height: 100%;
  /* margin-top: 8px; */
  padding: 0 12px 0 24px;
`;

const Month = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const Year = styled.select`
  background-color: transparent;
  /* color: colors.$WHITE; */
  border: none;

  font-size: 16px;

  padding-right: 5px;
  cursor: pointer;
  /* font-family: 'Noto Sans KR', serif; */

  appearance: none;
  background: url('../');
  color: white;
`;

const DirectBtn = styled.button`
  border: none;
  color: white;
  background-color: transparent;
`;

const SearchPeriodBtn = styled(ManageSearchRoundedIcon)``;
