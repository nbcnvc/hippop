import React, { useState } from 'react';
import { SearchCalendarProps } from '../../types/props';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { styled } from 'styled-components';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const SearchCalendar = ({ onSearch }: SearchCalendarProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleStartDateChange = (date: Date) => {
    if (startDate < date) {
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
    onSearch(startDate, endDate);
  };

  return (
    <Container>
      {/* <div>기간별</div> */}
      <StartDateBox>
        <CalendarMonthOutlinedIcon />
        <StyledDatePicker // DatePicker의 styled-component명
          locale={ko} //한글
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          onChange={handleStartDateChange}
        />
      </StartDateBox>

      <EndDateBox>
        <CalendarMonthOutlinedIcon />
        <StyledDatePicker
          locale={ko} //한글
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          onChange={handleEndDateChange}
        />
        <button onClick={handleSearch}>검색</button>
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
const EndDateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const StyledDatePicker = styled(DatePicker)``;
