import React, { useEffect, useState } from 'react';
// 라이브러리
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getMonth, getYear } from 'date-fns';
import { styled } from 'styled-components';
// 타입
import { SearchCalendarProps } from '../../types/props';
// alert
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// mui
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
// 스타일
import { St } from './style/St.SearchCalender';

const SearchCalendar = ({ onSearch, resetStartDate, resetEndDate }: SearchCalendarProps) => {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

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
    if (endDate && endDate < date) {
      toast.info('종료일 보다 클 수는 없어요~ :)', {
        className: 'custom-toast',
        theme: 'light'
      });
      setEndDate(date);
      setStartDate(date);
    } else {
      setStartDate(date);
    }
  };
  const handleEndDateChange = (date: Date) => {
    if (startDate && startDate > date) {
      toast.info('시작일 보다 작을 수는 없어요~ :)', {
        className: 'custom-toast',
        theme: 'light'
      });
    } else {
      setEndDate(date);
    }
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      onSearch(startDate, endDate);
      const dateRange = { startDate, endDate };

      // 객체를 JSON 문자열로 변환하여 로컬 스토리지에 저장
      localStorage.setItem('DateRange', JSON.stringify(dateRange));
      // setStartDate(localStorage.getItem("DateRange", JSON.stringify(startDate)))
    } else {
      // 시작일 또는 종료일이 선택되지 않은 경우에 대한 처리
      toast.info('시작일과 종료일을 선택해주세요.', {
        className: 'custom-toast',
        theme: 'light'
      });
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 DateRange 값을 가져와서 설정
    const storedDateRange = localStorage.getItem('DateRange');
    if (storedDateRange) {
      const { startDate: storedStartDate, endDate: storedEndDate } = JSON.parse(storedDateRange);
      setStartDate(new Date(storedStartDate));
      setEndDate(new Date(storedEndDate));
      localStorage.removeItem('DateRange');
    } else if (resetStartDate === null || resetEndDate === null) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [resetStartDate, resetEndDate]);

  return (
    <St.Container>
      {/* <div>기간별</div> */}

      <St.StartDateBox>
        <St.StyledDatePicker // DatePicker의 styled-component명
          locale={ko} //한글
          placeholderText="시작일"
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
            <St.CalanderContainer>
              <St.DirectBtn type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {'<'}
              </St.DirectBtn>
              <St.Month>{MONTHS[getMonth(date)]}</St.Month>
              <St.Year value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </St.Year>
              <div>
                <St.DirectBtn type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {'>'}
                </St.DirectBtn>
              </div>
            </St.CalanderContainer>
          )}
        />
      </St.StartDateBox>

      <St.Ptag>~</St.Ptag>
      <St.EndDateBox>
        <St.StyledDatePicker
          locale={ko} //한
          placeholderText="종료일"
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
            <St.CalanderContainer>
              <St.DirectBtn type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {/* <LeftArrow fill="#ffffff" /> */}
                {'<'}
              </St.DirectBtn>
              <St.Month>{MONTHS[getMonth(date)]}</St.Month>
              <St.Year value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </St.Year>
              <div>
                <St.DirectBtn type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {/* <RightArrow fill="#ffffff" /> */}
                  {'>'}
                </St.DirectBtn>
              </div>
            </St.CalanderContainer>
          )}
        />
        <St.SearchBtn onClick={handleSearch}>
          <St.SearchPeriodBtn />
        </St.SearchBtn>
      </St.EndDateBox>
    </St.Container>
  );
};

export default SearchCalendar;
