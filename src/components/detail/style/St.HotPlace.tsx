import { styled } from 'styled-components';
// mui
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled as muiStyled } from '@mui/material/styles';

export const St = {
  HotPlaceContainer: styled.div`
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

      .noti-box {
        display: flex;
        align-items: center;
        margin-top: 20px;
        font-size: 18px;

        .info-tip {
          display: flex;
          align-items: center;
          font-weight: 600;
          margin-right: 13px;
        }
      }

      .button-box {
        button {
          font-weight: 600;
          background-color: var(--second-color);
          margin: 35px 15px;
          padding: 10px 22px;
        }
      }
    }

    .toggle-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .marker-info {
        margin-right: 10px;
        padding-top: 10px;

        animation: blink 5s infinite; /* 깜빡거리는 애니메이션 적용 */

        @keyframes blink {
          0% {
            opacity: 1; /* 시작 시 fully visible */
          }
          50% {
            opacity: 0; /* 중간에 투명 */
          }
          100% {
            opacity: 1; /* 다시 fully visible */
          }
        }
      }
    }
  `,

  IOSSwitch: muiStyled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 63,
    height: 34,
    padding: 0,
    overflow: 'unset',

    '& .css-ns11ct-MuiSwitch-root': {
      overflow: 'unset'
    },

    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: '5px 9px',
      transitionDuration: '300ms',
      border: '3px solid var(--fifth-color)',

      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: 'var(--primary-color)',

        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#edededbc',
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
      backgroundColor: theme.palette.mode === 'light' ? '#edededbc' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    }
  }))
};
