import { useEffect, useState } from 'react';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import styled from 'styled-components';

import './styles.css';
import { CardProps } from '../../types/props';
import { supabaseStorageUrl } from '../../api/supabase';

const heights = [300, 550, 450, 330, 600, 720];

function getRandomElement(arr: number[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const Card = (props: CardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  const { title, images, location, period_start, period_end } = props.store;
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);

  useEffect(() => {
    setCardHeight(getRandomElement(heights));
  }, []);

  return (
    <CardContainer
      ref={sliderRef}
      className="keen-slider"
      style={{ height: cardHeight }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {images.map((image) => (
        <img src={`${supabaseStorageUrl}/${image}`} className="keen-slider__slide" key={image} />
      ))}
      {isHovered && (
        <StoreInfo>
          <div>{title}</div>
          <div>{location}</div>
          <div>{`${period_start} ~ ${period_end}`}</div>
        </StoreInfo>
      )}
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={() => {
              instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={() => {
              instanceRef.current?.next();
            }}
            disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
          />
        </>
      )}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  border-radius: 18px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StoreInfo = styled.div`
  position: absolute;
  top: 70%;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
`;

const Arrow = (props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) => {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  const zIndex = 4;

  const handleClick = (e: any) => {
    e.preventDefault();
    props.onClick(e);
  };

  return (
    <svg
      onClick={handleClick}
      style={{ zIndex }}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};
