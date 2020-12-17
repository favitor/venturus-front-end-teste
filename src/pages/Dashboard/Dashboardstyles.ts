import styled from 'styled-components';
import { shade } from 'polished';

export const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 17px;

  .left-container {
    background: #fff;
    border-radius: 15px;
    width: 45%;
    height: 750px;
    margin: 30px 40px 20px;
    padding: 24px;
    display: block;
    text-decoration: none;
    box-shadow: 0 4px 4px 0px lightgray;

    button {
      width: 40px;
      height: 40px;
      color: #fff;
      border-radius: 10px;
      border: 1px solid #ffc2f5;
      background: linear-gradient(to bottom, #a9397a, #823381);
      box-shadow: 0 0px 7px 0px #a6006a;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: ${shade(0.2, '#ffc2f5')};
      }
    }

    h1 {
      color: #70008c;
      font-weight: 700;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 25px;
      border-bottom: 1px solid lightgray;
    }
  }

  .right-container {
    width: 55%;

    .top-container {
      background: #fff;
      border-radius: 15px;
      height: 400px;
      margin: 5px 40px 0;
      padding: 24px;
      display: block;
      text-decoration: none;
      box-shadow: 0 4px 4px 0px lightgray;

      h1 {
        color: #70008c;
        font-weight: 700;
        padding-bottom: 25px;
        border-bottom: 1px solid lightgray;
      }

      .player-data {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: row;

        .pd-left-container {
          display: flex;
          flex-direction: column;
          width: 50%;
          height: 100%;

          h3 {
            margin-top: 10px;
          }

          .pd2-left-container {
            margin: 10px 0 0 10px;
            border-radius: 15px;
            background: #eddfe9;
            width: 90%;
            height: 90%;

            .team-info {
              width: 96%;
              height: 40px;
              padding: 8px;
              margin: 6px 0 0 4px;
              border-radius: 10px;
              background: #fff;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: default;
              border: 2px solid transparent;
              transition: border 0.2s;
              font-size: 18px;

              &:hover {
                border: 2px solid #de0039;
                cursor: default;
              }
            }
          }
        }

        .pd-right-container {
          display: flex;
          flex-direction: column;
          width: 50%;
          height: 100%;

          h3 {
            margin-top: 10px;
          }

          .pd2-right-container {
            margin: 10px 0 0 10px;
            border-radius: 15px;
            background: #eddfe9;
            width: 90%;
            height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .team-info {
              width: 96%;
              height: 40px;
              padding: 8px;
              margin-top: 6px;
              border-radius: 10px;
              background: #fff;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: default;
              border: 2px solid transparent;
              transition: border 0.2s;
              font-size: 18px;

              &:hover {
                border: 2px solid #de0039;
                cursor: default;
              }
            }
          }
        }
      }
    }
  }
`;
