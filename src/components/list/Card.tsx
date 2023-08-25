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
  const { images } = props.store;
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

  return (
    <CardContainer ref={sliderRef} className="keen-slider" style={{ width: '30%', height: getRandomElement(heights) }}>
      {images.map((image) => (
        <img src={`${supabaseStorageUrl}/${image}`} className="keen-slider__slide" key={image} />
      ))}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  background-color: red;
  border-radius: 7px;
  width: 300px;
  height: 200px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
