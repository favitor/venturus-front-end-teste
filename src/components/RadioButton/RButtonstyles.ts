import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10px;

  > p {
    margin-bottom: 10px;
    font-weight: 500;
  }

  label {
    display: inline-block;
    position: relative;
    width: 80px;
    margin: 0 35px 10px 0;
    cursor: pointer;
    font-size: 12px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    p {
      float: right;
      margin: 2px 0px 0 10px;
      width: 50px;
    }
  }
  /* Hide the native browser radiobox */
  label input {
    opacity: 0;
    cursor: pointer;
  }
  /* Creating a custom radiobox */
  span {
    position: absolute;
    top: 0px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid gray;
  }
  /* On mouse-over, add a pink border color  */
  label:hover input ~ span {
    border-color: #de0039;
  }
  /* When the radio button is checked, add a pink border and colour p tag */
  label input:checked ~ span,
  input:checked ~ p {
    color: #de0039;
  }
  /* Create the indicator (the dot/circle - hidden when not checked) */
  span:after {
    content: '';
    position: relative;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  label input:checked ~ span:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  label span:after {
    top: 3px;
    left: 3px;
    position: relative;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #de0039, #70008c);
  }
`;
