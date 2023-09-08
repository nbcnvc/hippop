import React, { useEffect } from 'react';
import AboutBannser from '../components/about/AboutBannser';
import AboutInfo from '../components/about/AboutInfo';

const About = () => {
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
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
