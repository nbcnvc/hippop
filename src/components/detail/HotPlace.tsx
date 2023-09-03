import React, { useState } from 'react';
// 타입
import { HotPlaceProps } from '../../types/props';
// 스타일
import { styled } from 'styled-components';
// mui
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled as muiStyled } from '@mui/material/styles';

const HotPlace = ({ setCategory, setIsSelected }: HotPlaceProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleHotPlaceCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setCategory(name);
    setIsSelected(undefined);
    setIsOpened(true);
  };

  const handleShowMarker = () => {
    setCategory('');
    setIsSelected(undefined);
    setIsOpened(false);
  };

  return (
    <HotPlaceContainer>
      <div className="hotplace-title">
        <h1>함께 갈만한 핫플레이스 추천!</h1>
        {/* <div style={{ marginTop: '10px', fontSize: '16px' }}> (카테고리 클릭 후) 마커핀을 클릭해 보세요!</div> */}
        <div className="button-box">
          <button name="맛집" onClick={handleHotPlaceCategory}>
            # 맛집
          </button>
          <button name="카페" onClick={handleHotPlaceCategory}>
            # 카페
          </button>
          <button name="술집" onClick={handleHotPlaceCategory}>
            # 술집
          </button>
        </div>
      </div>
      <div className="toggle-button">
        <IOSSwitch checked={isOpened} onClick={handleShowMarker} />
      </div>
    </HotPlaceContainer>
  );
};

export default HotPlace;

const HotPlaceContainer = styled.div`
  width: 100%;

  .hotplace-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;

    h1 {
      color: var(--fifth-color);
      font-size: 30px;
      background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
    }

    .button-box {
      button {
        margin: 40px 15px;
        padding: 7px 25px;
        background-color: var(--second-color);
      }
    }
  }

  .toggle-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const IOSSwitch = muiStyled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 64,
  height: 34,
  padding: 0,
  overflow: 'unset',

  '& .css-ns11ct-MuiSwitch-root': {
    overflow: 'unset'
  },

  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: '5px 8px',
    transitionDuration: '300ms',
    border: '3px solid var(--fifth-color)',

    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: 'var(--primary-color)',

      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#e7e7e7cb',
        opacity: 1,

        border: '3px solid var(--fifth-color)'
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.3
      }
    },

    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#eb455f',
      border: '6px solid #fff'
    },

    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },

    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },

  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 24,
    height: 24
  },

  '& .MuiSwitch-track': {
    border: '3px solid var(--fifth-color)',
    borderRadius: 26,
    backgroundColor: theme.palette.mode === 'light' ? '#e7e7e7cb' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));
