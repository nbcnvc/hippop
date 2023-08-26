import { useEffect, useState } from 'react';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import styled from 'styled-components';

import { CardProps } from '../../types/props';
import { supabaseStorageUrl } from '../../api/supabase';

const heights = [300, 550, 450, 370, 320, 390, 330];

function getRandomElement(arr: number[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const Card = (props: CardProps) => {
  const { title, images, location, period_start, period_end } = props.store;
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      }
    ]
  );

  useEffect(() => {
    setCardHeight(getRandomElement(heights));
  }, []);

  return (
    <CardContainer
      ref={sliderRef}
      className="keen-slider"
      style={{ width: '30%', height: cardHeight }}
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
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  border-radius: 7px;
  width: 300px;
  height: 200px;
  overflow: hidden;

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
