import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 350px;
  height: 40px;
  padding: 10px;
  border: none;
  font-weight: 500;
  border-radius: 5px;
  color: #fff;
  border: 1px solid #ffc2f5;
  background: linear-gradient(to bottom, #94337e, #7a2c7f);
  box-shadow: 0 0px 7px 0px #a6006a;

  &:hover {
    background: ${shade(0.2, '#de0039')};
  }
`;
