import { styled } from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

export const St = {
  AlarmContainer: styled.li`
    position: absolute;
    top: 19px;
    right: -285px;
    list-style: none;
    color: black;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--fifth-color);
    border-radius: 6px;
    z-index: 1;
  `,

  AlarmContents: styled.div`
    width: 280px;
    font-size: 14px;
    text-align: left;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: var(--sixth-color);
      font-weight: 600;
    }

    &:first-child {
      border-radius: 6px 6px 0 0;
    }

    &:last-child {
      border-radius: 0 0 6px 6px;
    }
  `,

  AlarmTime: styled.span`
    font-size: 10px;
    color: #686868;
  `,

  AlarmInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  AlarmDeleteIcon: styled(DeleteIcon)`
    &:hover {
      color: var(--primary-color);
    }
  `
};
