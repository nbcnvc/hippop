import { styled } from 'styled-components';

const TopButton = () => {
  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Top onClick={ScrollToTop}>TOP</Top>;
};

export default TopButton;

const Top = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  z-index: 9999;
  right: 30px;
  transition: all 0.1s ease-in-out;
`;
