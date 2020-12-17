import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column-reverse;

  input {
    width: 370px;
    margin-bottom: 30px;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 4px;
    padding: 5px;

    ${props =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

    ${props =>
      props.isDisabled &&
      css`
        background: lightgray;
      `}

    &::placeholder {
      color: #b5bcc7;
    }

    &:focus {
      border: 1px solid #de0039;
    }
  }

  label {
    font-weight: 500;
  }

  input:focus + label {
    color: #de0039;
  }
`;
