import { styled } from 'styled-components';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';

const TopButton = () => {
  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Top onClick={ScrollToTop}>
      <KeyboardDoubleArrowUpRoundedIcon />
    </Top>
  );
};

export default TopButton;

const Top = styled.button`
  width: 50px;
  border-radius: 30px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  z-index: 1;
  right: 20%;
  transition: all 0.1s ease-in-out;
  @media (max-width: 1700px) {
    right: 15%;
  }
  @media (max-width: 980px) {
    right: 10%;
  }
`;
