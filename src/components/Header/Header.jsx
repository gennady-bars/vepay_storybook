import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import { logout } from "../../redux/actions/loginActions";
import whiteLogo from '../../img/logo-white-text.svg'

import styles from "./Header.module.scss";

export const Header = ({user, logout, isOpen, toggle}) => {

  return (
    <div className={styles.Header}>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to='/'>
          <img src={whiteLogo} alt="whiteLogo"/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            
            
          </Nav>
          <NavbarText className='mr-4'>пользователь: <strong>{user}</strong> </NavbarText>
          <NavbarText 
            onClick={logout}
            // onClick={() => alert('функция пока отключена. Загляните в Header')}
            className={styles.logout}
            >выйти</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
    }
}

export default connect(mapStateToProps, {logout})(Header);
