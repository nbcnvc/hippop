import React from 'react';
// 라이브러리
import { DatePicker, useDatePickGetter, useDatePickReset } from '@bcad1591/react-date-picker';
import moment from 'moment';

const DatePicker1 = () => {
  const { pickedDates } = useDatePickGetter();
  const resetFunc = useDatePickReset();

  // Format the picked dates using moment.js
  const firstPickedDateFormatted = pickedDates.firstPickedDate
    ? moment(pickedDates.firstPickedDate).format('YYYY.MM.DD')
    : '';
  const secondPickedDateFormatted = pickedDates.secondPickedDate
    ? moment(pickedDates.secondPickedDate).format('YYYY.MM.DD')
    : '';

  return (
    <div>
      <DatePicker disablePreviousDays={true} />
      <hr />
      <div>{firstPickedDateFormatted}</div>
      <div>{secondPickedDateFormatted}</div>
      <button type="button" onClick={resetFunc}>
        Reset
      </button>
    </div>
  );
};

export default DatePicker1;
