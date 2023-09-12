import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
// style component
import { St } from './style/St.TopButton';

const TopButton = () => {
  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <St.Top onClick={ScrollToTop}>
      <KeyboardDoubleArrowUpRoundedIcon />
    </St.Top>
  );
};

export default TopButton;
