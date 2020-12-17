import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface PositionProps {
  positionNumber: number;
  hasPlayer: boolean;
}

export const Container = styled.div<PositionProps>`
  .player-position {
    border: 2px dashed ${transparentize(0.35, 'lightgray')};
    width: 65px;
    height: 65px;
    line-height: 65px;
    vertical-align: middle;
    text-align: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .player-position-center {
      z-index: 1;
      background: ${transparentize(0.35, '#fff')};
      border: 1px solid #de0039;

      width: 55px;
      height: 55px;
      line-height: 55px;
      vertical-align: middle;
      text-align: center;
      font-size: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: #fff;
      }
    }
  }

  ${props =>
    props.hasPlayer &&
    css`
      .player-div {
        .tooltip-div {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-evenly;
          width: 190px;
          height: 120px;
          background: black;
          border-radius: 4px;
          font-size: 12px;
          z-index: 2;
          margin-top: 68px;
          opacity: 0;
          transition: opacity 0.4s;
          visibility: hidden;

          div {
            height: 20px;
            display: flex;
            flex-direction: row;
            bottom: 20px;

            p {
              margin-left: 4px;
              color: #fff;
              max-width: 140px;
              -webkit-box-orient: horizontal;
              -webkit-line-clamp: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-weight: 500;
            }
          }
        }

        .player-position {
          border: 2px dashed lightgray;
          width: 65px;
          height: 65px;
          line-height: 65px;
          vertical-align: middle;
          text-align: center;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          .player-position-center {
            z-index: 1;
            background: #fff;
            border: 1px solid #de0039;

            width: 55px;
            height: 55px;
            line-height: 55px;
            vertical-align: middle;
            text-align: center;
            font-size: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            p {
              color: #70008c;
              font-size: 20px;
              font-weight: 500;
            }
          }
        }
      }

      .player-div:hover .tooltip-div {
        opacity: 1;
        transition: opacity 0.4s;
        visibility: visible;
      }
    `}
`;
