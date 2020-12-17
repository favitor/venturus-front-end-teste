import React from 'react';
import logoImg from '../../assets/logo_v_.png';
import { Container } from './Headerstyles';

const Header: React.FC = () => {
  return (
    <Container>
      <div className="left-div">
        <img src={logoImg} alt="logo-venturus" />
        <h2>Squad Management Tool</h2>
      </div>
      <div className="right-div">
        <h4>John Doe</h4>
        <div className="user-initials">JD</div>
      </div>
    </Container>
  );
};

export default Header;
