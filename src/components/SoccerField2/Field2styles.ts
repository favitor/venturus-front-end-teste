import styled from 'styled-components';
import { transparentize, shade } from 'polished';

interface SoccerFieldData {
  formationValue: string;
}

export const Container = styled.div<SoccerFieldData>`
  .select-div {
    margin-right: 45px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;

    > label {
      margin-right: 10px;
      font-weight: 500;
    }
    select {
      width: 100px;
      height: 30px;
      padding: 5px;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0 2px 2px lightgray;
    }

    button {
      margin: 0;
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
      width: fit-content;
      font-weight: 500;
      padding: 5px;

      &:hover {
        background: ${shade(0.2, '#de0039')};
      }
    }
  }

  .soccer-field {
    margin: 20px 0;
    width: 320px;
    height: 450px;
    overflow-y: auto;
    border-radius: 5px;
    background: linear-gradient(to bottom, #a3377d, #752c80);
    display: flex;
    justify-content: center;
    align-items: center;

    .soccer-field-line {
      position: absolute;
      box-sizing: inherit;
      width: 290px;
      height: 1px;
      border-top: solid 1px ${transparentize(0.6, '#fff')};
    }

    .soccer-field-circle {
      position: absolute;
      width: 90px;
      height: 90px;
      border: 1px solid ${transparentize(0.6, '#fff')};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      :after {
        position: absolute;
        width: 1px;
        height: 1px;
        background-color: ${transparentize(0.6, '#fff')};
        content: '';
        border: 1px solid ${transparentize(0.6, '#fff')};
        border-radius: 50%;
      }
    }

    .players-formation {
      width: inherit;
      height: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .goalKeeper,
      .defenders,
      .midFields1,
      .midFields2,
      .attackers {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
`;
