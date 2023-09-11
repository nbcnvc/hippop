import { styled } from 'styled-components';
// mui
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

export const St = {
  BookMarkBtn: styled.div`
    color: #2b3467;
  `,

  BookMarkOn: styled(BookmarkIcon)`
    font-size: large;
    cursor: pointer;
  `,

  BookMarkOff: styled(TurnedInNotIcon)`
    font-size: large;
    cursor: pointer;
  `
};
