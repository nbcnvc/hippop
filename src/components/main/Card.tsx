import { useEffect, useState, useCallback } from 'react';
// 타입
import { CardProps } from '../../types/props';
// api
import { supabaseStorageUrl } from '../../api/supabase';
// 스타일
import { St } from './style/St.Card';

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
        <St.CardContainerClosed
          style={{ height: cardHeight }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img src={`${supabaseStorageUrl}/${images[0]}`} className="keen-slider__slide" />
          <St.ClosedStoreInfo>
            <St.CLosed>CLOSED</St.CLosed>
          </St.ClosedStoreInfo>
          <St.StoreInfo
            className="store-info"
            style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? '100%' : '0' }}
          >
            <div className="closed-wrap">
              <h2>CLOSED</h2>
              <h5>{title}</h5>
              <p>{location}</p>
              <span>{`${period_start} ~ ${period_end}`}</span>
            </div>
          </St.StoreInfo>
        </St.CardContainerClosed>
      ) : (
        <St.CardContainer style={{ height: cardHeight }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img src={`${supabaseStorageUrl}/${images[0]}`} />
          <St.StoreInfo
            className="store-info"
            style={{ opacity: isHovered ? 1 : 0, maxHeight: isHovered ? '100%' : '0' }}
          >
            <div className="info-wrap">
              <h2>{title}</h2>
              <p>{location}</p>
              <span>{`${period_start} ~ ${period_end}`}</span>
            </div>
          </St.StoreInfo>
        </St.CardContainer>
      )}
    </>
  );
};

export default Card;
