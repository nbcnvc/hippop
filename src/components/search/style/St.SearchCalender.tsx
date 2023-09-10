import { styled } from 'styled-components';
import DatePicker from 'react-datepicker';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
export const St = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 25px;

    /* margin-bottom: 80px; */
  `,

  StartDateBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
  `,

  Ptag: styled.p`
    margin: 10px;
  `,
  EndDateBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
  `,

  SearchBtn: styled.button`
    margin-left: 10px;
    background-color: #2b3467;
  `,

  StyledDatePicker: styled(DatePicker)`
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
  `,
  CalanderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    /* justify-content: center; */
    align-items: center;

    height: 100%;
    /* margin-top: 8px; */
    padding: 0 12px 0 24px;
  `,

  Month: styled.div`
    color: white;
    font-size: 16px;
    font-weight: 500;
  `,

  Year: styled.select`
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
  `,

  DirectBtn: styled.button`
    border: none;
    color: white;
    background-color: transparent;
  `,

  SearchPeriodBtn: styled(ManageSearchRoundedIcon)``
};
