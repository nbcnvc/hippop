import { useEffect } from 'react';
import AboutBannser from '../components/about/AboutBannser';
import AboutInfo from '../components/about/AboutInfo';

const About = () => {
  useEffect(() => {
    return () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  }, []);
  return (
    <>
      <AboutBannser />
      <AboutInfo />
    </>
  );
};

export default About;
