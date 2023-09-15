import { styled } from 'styled-components';
import { HotPlaceInfo } from '../../../types/types';

export const St = {
  MapContainer: styled.div`
    width: 100%;

    .info-title {
      position: absolute;
      background: rgb(255, 255, 255);
      border: 1px solid rgb(118, 129, 168);
      z-index: 0;
      display: block;
      width: 207px;
      height: 23px;
      cursor: default;
    }

    .map-iframe {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      gap: 15px;

      .customoverlay {
        text-align: center;
        color: #fff;
        font-weight: 600;
        background-color: var(--fifth-color);
        border: 3px solid var(--fifth-color);
        border-radius: 18px;
        padding: 10px 20px;
      }

      .customoverlay-nearby {
        text-align: center;
        color: var(--fifth-color);
        font-weight: 600;
        background-color: #fff;
        border: 3px solid var(--fifth-color);
        border-radius: 18px;
        padding: 10px 20px;
      }

      iframe {
        width: 40%;
        height: 600px;
        border-radius: 10px;
        border: 3px solid #333333;
      }
    }

    @media (max-width: 1800px) {
      .map-iframe {
        iframe {
          width: 50%;
        }
      }
    }
  `,

  KaKaoMap: styled.div<{ isSelected: HotPlaceInfo | undefined; category: string }>`
    width: ${(props) => (props.isSelected && props.category ? '60%' : '100%')};
    height: 600px;
    border-radius: 10px;
    border: 3px solid #333333;

    @media (max-width: 1800px) {
      width: ${(props) => (props.isSelected && props.category ? '50%' : '100%')};
    }
  `
};
