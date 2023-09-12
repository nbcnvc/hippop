import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { CardProps } from '../../types/props';
import { supabaseStorageUrl } from '../../api/supabase';

const heights = [300, 550, 450, 330, 600, 720];

function getRandomElement(arr: number[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const Card = (props: CardProps) => {
  const { title, images, location, period_start, period_end, isclosed } = props.store;

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
      {isclosed ? (
        <CardContainerClosed style={{ height: cardHeight }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img src={`${supabaseStorageUrl}/${images[0]}`} className="keen-slider__slide" />
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
        </CardContainerClosed>
      ) : (
        <CardContainer style={{ height: cardHeight }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img src={`${supabaseStorageUrl}/${images[0]}`} />
          <StoreInfo className="store-info" style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? '100%' : '0' }}>
            <div className="info-wrap">
              <h2>{title}</h2>
              <p>{location}</p>
              <span>{`${period_start} ~ ${period_end}`}</span>
            </div>
          </StoreInfo>
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
  box-sizing: border-box;
  margin: 0 auto;
  transition: transform 0.3s ease;
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
  box-sizing: border-box;
  transition: transform 0.3s ease;

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
  max-height: 100%;
  overflow: hidden;
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.3s ease; /* opacity와 transform에 transition 효과 추가 */

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
