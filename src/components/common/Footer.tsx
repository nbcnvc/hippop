// style component
import { St } from './style/St.Footer';

const Footer = () => {
  return (
    <St.FooterTag>
      <div className="footer-inner">
        <img src="/asset/nyb_logo.png" className="hover-logo" alt="logo img" />
        <ul>
          <li>Google</li>
          <li>Kakao</li>
          <li>Facebook</li>
        </ul>
        <ul>
          <li>ABOUT</li>
          <li>REVIEW</li>
          <li>MATE</li>
          <li>SEARCH</li>
        </ul>
        <span>
          Project-Name : HIPPOP | Team : 그 여름, 우리는
          <br />
          Developer : 조성록 / 장혜진 / 나윤빈 / 김우리 / 조진명 | Designer : 양윤아 <br /> Build-Period : 2023.08.16 ~
          2023.09.18
          <br />
          Stack : React TypeScript | Design-Tool : Figma | GitHub : https://github.com/nbcnvc/hippop
          <br />
          Contact : HarryScreet / huizhen
        </span>
      </div>
    </St.FooterTag>
  );
};

export default Footer;
