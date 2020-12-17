import styled from 'styled-components';
import { shade } from 'polished';

export const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button.arrow {
    margin-top: 3px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    border: none;
    background: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#de0039')};
    }
  }

  div.main-container {
    background: #fff;
    border-radius: 15px;
    width: 93%;
    height: 1380px;
    margin: 50px 40px 40px;
    padding: 24px;
    text-decoration: none;
    box-shadow: 0 4px 4px 0px lightgray;

    form {
      .upper-title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
      }
    }

    > h2 {
      padding-bottom: 25px;
      border-bottom: 1px solid lightgray;
      color: #70008c;
      font-weight: 700;
    }

    .team-information-form {
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .upper-info {
        margin-bottom: 80px;
        width: 75%;
        height: 200px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .left-div {
          height: 320px;
          display: flex;
          flex-direction: column;

          label {
            margin-bottom: 10px;
          }
        }

        .right-div {
          height: 320px;
          display: flex;
          flex-direction: column;

          label {
            margin-bottom: 10px;
          }
        }
      }
    }

    .configure-squad-container {
      height: 700px;

      .bottom-title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 30px 0;
      }

      .bottom-info {
        height: inherit;
        display: flex;
        justify-content: space-between;
        margin: 0 160px;

        .bottom-left-div {
          height: inherit;
        }

        .bottom-right-div {
          height: inherit;

          button {
            margin: -25px 0 25px 0;
            width: 30px;
            height: 30px;
            color: #fff;
            border-radius: 10px;
            border: 1px solid #de0039;
            background: linear-gradient(to bottom, #de0039, #70008c);
            box-shadow: 0 0px 7px 0px #a6006a;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
              background: ${shade(0.2, '#de0039')};
            }
          }

          .button-errors-loading-div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .error-messages1 {
              margin-top: -35px;
              color: #ff0000;
              font-size: 14px;

              ul {
                list-style: none;
                max-width: 325px;
              }
            }

            .animated-icon {
              margin: -25px 0 25px 0;
              display: flex;
              flex-direction: row;

              svg {
                margin-right: 3px;
                -webkit-animation: spin 1.5s linear infinite;
                -moz-animation: spin 1.5s linear infinite;
                animation: spin 1.5s linear infinite;
              }
              @-moz-keyframes spin {
                100% {
                  -moz-transform: rotate(360deg);
                }
              }
              @-webkit-keyframes spin {
                100% {
                  -webkit-transform: rotate(360deg);
                }
              }
              @keyframes spin {
                100% {
                  -webkit-transform: rotate(360deg);
                  transform: rotate(360deg);
                }
              }
            }
          }

          .clear-button {
            width: fit-content;
            font-weight: 500;
            padding: 5px;
          }

          div .bottom-buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.2s;

            .error-messages2 {
              font-size: 14px;
              margin-top: -45px;
              max-height: 40px;
              color: #ff0000;
              max-width: 175px;
              display: flex;
              align-items: flex-start;
              -webkit-box-orient: horizontal;
              -webkit-line-clamp: 2;
            }

            .animated-icon2 {
              margin: -25px 0 25px 0;
              display: flex;
              flex-direction: row;

              svg {
                margin-right: 3px;
                -webkit-animation: spin 1.5s linear infinite;
                -moz-animation: spin 1.5s linear infinite;
                animation: spin 1.5s linear infinite;
              }
              @-moz-keyframes spin {
                100% {
                  -moz-transform: rotate(360deg);
                }
              }
              @-webkit-keyframes spin {
                100% {
                  -webkit-transform: rotate(360deg);
                }
              }
              @keyframes spin {
                100% {
                  -webkit-transform: rotate(360deg);
                  transform: rotate(360deg);
                }
              }
            }
          }
        }
      }
    }
  }
`;
