import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  hasTags: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  label {
    ${props =>
      props.isFocused &&
      css`
        color: #de0039;
      `}
  }

  div {
    padding: 5px;
    width: 350px;
    height: 100px;
    border: 1px solid grey;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    overflow-y: auto;
    flex-flow: row wrap;
    max-width: 350px;

    ${props =>
      props.isFocused &&
      css`
        border-color: #de0039;
      `}

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

    ul {
      display: flex;
      flex-flow: row wrap;
      max-width: 350;
      overflow-y: auto;

      li {
        width: fit-content;
        list-style: none;
        padding: 4px 14px;
        background: #de0039;
        border-radius: 18px;
        height: fit-content;
        font-size: 14px;
        margin: 0 6px 4px 0;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;

        p {
          color: #fff;
          font-weight: 500;
        }

        button {
          background: none;
          border: none;
          margin-left: 5px;
          display: flex;
          align-items: center;
          color: #fff;
          cursor: pointer;
        }
      }

      input {
        height: fit-content;
        margin-top: 3px;
        width: fit-content;
        border: none;
        font-size: 14px;
        font-family: 'Roboto Slab', serif;

        &::placeholder {
          color: #b5bcc7;

          ${props =>
            props.hasTags &&
            css`
              visibility: hidden;
            `}
        }
      }
    }
  }
`;
