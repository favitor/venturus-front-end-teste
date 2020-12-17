import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* .loading {
    animation-name: loading;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
  } */
  max-height: 600px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ff99b3;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${shade(0.1, '#ff99b3')};
  }

  border-bottom: 0 !important;
  table {
    width: 100%;
    margin-top: 50px;
    border-collapse: collapse;
    font-size: 15px;

    th,
    td {
      color: #414449;
      padding: 13px;
      text-align: left;
      line-height: 24px;
    }

    thead {
      th {
        color: #3c405f;
        padding: 15px 13px 13px;
        border-top: 0;
        height: 40px;

        span {
          float: right;
          margin-left: 15px;
        }

        :first-child {
          border-right: 1px solid lightgray;
          width: 160px;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid lightgray;

        td {
          padding: 13px 4px !important;

          > p {
            max-width: 135px;
            -webkit-box-orient: horizontal;
            -webkit-line-clamp: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          div {
            border-bottom: 0 !important;
            padding: 0 !important;
            max-width: 98%;
            width: 98% !important;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            span {
              visibility: hidden;
            }

            p {
              max-width: 220px;
              -webkit-box-orient: horizontal;
              -webkit-line-clamp: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }

        &:hover {
          background: #fce9f7;
          width: 100%;

          span {
            visibility: visible;
            width: 75px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            cursor: pointer;
          }

          td {
            color: #de0093;
          }
        }
      }
    }
  }

  /* @keyframes loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.3;
    }
  } */
`;
