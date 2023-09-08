import { useEffect, useState, useCallback } from 'react';

import 'keen-slider/keen-slider.min.css';
import styled from 'styled-components';
import { useKeenSlider } from 'keen-slider/react';

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

  const { title, images, location, period_start, period_end, isClosed } = props.store;
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);

  useEffect(() => {
    setCardHeight(getRandomElement(heights));
  }, []);

  const handleMouseOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <>
      {isClosed ? (
        <CardContainerClosed
          ref={sliderRef}
          className="keen-slider"
          style={{ height: cardHeight }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {images.map((image) => (
            <img src={`${supabaseStorageUrl}/${image}`} className="keen-slider__slide" key={image} />
          ))}
          <ClosedStoreInfo>
            <CLosed>CLOSED</CLosed>
          </ClosedStoreInfo>

          <StoreInfo className="store-info" style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? '100%' : '0' }}>
            <div className="closed-wrap">
              <h2>CLOSED</h2>
              <h5>{title}</h5>
              <p>{location}</p>
              <span>{`${period_start} ~ ${period_end}`}</span>
            </div>
          </StoreInfo>
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
        </CardContainerClosed>
      ) : (
        <CardContainer
          ref={sliderRef}
          className="keen-slider"
          style={{ height: cardHeight }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {images.map((image) => (
            <img src={`${supabaseStorageUrl}/${image}`} className="keen-slider__slide" key={image} />
          ))}
          <StoreInfo className="store-info" style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? '100%' : '0' }}>
            <div className="info-wrap">
              <h2>{title}</h2>
              <p>{location}</p>
              <span>{`${period_start} ~ ${period_end}`}</span>
            </div>
          </StoreInfo>
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
      )}
    </>
  );
};

export default Card;

const CardContainerClosed = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 18px;

  transition: all 0.3s ease-in-out; /* 크기 변화에 대한 트랜지션 추가 */
  box-sizing: border-box;

  margin: 0 auto;
  img {
    filter: grayscale(100%); /* 이미지를 흑백으로 만듭니다. */
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover {
    border: 3px solid var(--primary-color);
  }

  &:active {
    transform: scale(0.97); /* 클릭 시 작아지는 효과 */
  }
`;

const CLosed = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

const CardContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 18px;

  transition: all 0.3s ease-in-out; /* 크기 변화에 대한 트랜지션 추가 */
  box-sizing: border-box;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover {
    border: 3px solid var(--primary-color);
  }

  &:active {
    transform: scale(0.97); /* 클릭 시 작아지는 효과 */
  }
`;

const ClosedStoreInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 5px 10px;
`;

const StoreInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: white;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  max-height: 100%;
  overflow: hidden;
  z-index: 1;

  .closed-wrap {
    padding: 2rem;
    h2 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    p {
      line-height: 20px;
      margin-bottom: 20px;
    }
  }
  .info-wrap {
    padding: 2rem;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    p {
      line-height: 20px;
      margin-bottom: 20px;
    }
  }
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
