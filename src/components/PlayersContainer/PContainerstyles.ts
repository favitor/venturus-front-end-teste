import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 370px;
  height: 260px;
  max-height: 260px;
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

  .players-container {
    width: 350px;
    height: 90px;
    background: linear-gradient(to bottom, #f9f9f9, #e6e6e6);
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;

    h4 {
      margin-right: 5px;
    }

    p {
      color: #de0039;
      font-size: 15px;
    }

    .pc-upper-info {
      max-width: 90%;
      max-height: 40px;
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: 4px 0 4px 0;

        p {
          max-width: 200px;
          -webkit-box-orient: horizontal;
          -webkit-line-clamp: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .pc-bottom-info {
      max-width: 90%;
      max-height: 40px;
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: 6px 0 2px 0;

        p {
          max-width: 200px;
          -webkit-box-orient: horizontal;
          -webkit-line-clamp: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
`;
