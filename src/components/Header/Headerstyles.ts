import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  top: 0;
  height: 60px;
  background: linear-gradient(to right, #bf0e4f, #8a1f6e);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-div {
    display: flex;
    align-items: center;
    padding-left: 60px;

    img {
      width: 50px;
      height: 50px;
      color: #fff;
    }

    h2 {
      color: #fff;
      padding-left: 15px;
    }
  }

  .right-div {
    display: flex;
    align-items: center;
    padding-right: 40px;

    .logout {
      margin-left: 40px;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: #fff;
      cursor: pointer;
      background: none;
      border: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.4, '#70008c')};
      }
    }

    h4 {
      color: #fff;
      padding-right: 10px;
    }

    .user-initials {
      clear: left;
      border: 1px solid #de0039;
      background: #fff;
      color: #000;
      width: 40px;
      height: 40px;
      line-height: 40px;
      vertical-align: middle;
      text-align: center;
      font-size: 16px;
      border-radius: 50%;
    }
  }
`;
