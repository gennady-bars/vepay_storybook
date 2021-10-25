import React from "react";
import { Nav, NavItem } from 'reactstrap';
import MyDropDown from "../UI/MyDropDown/MyDropDown";
import MyLink from "../UI/MyLink/MyLink";

import styles from "./SideMenu.module.scss";

const SideMenu = ({isOpen, toggle}) => {
  

  const cls = [
    styles.SideMenu,
    !isOpen? styles.hiddenMenu: '',
  ]

  // const buttonCls = [
  //   styles.sideMenuBtn,
  // ]


  return (
    <div className={cls.join(' ')}>
      {/* <div 
        className={buttonCls.join(' ')}
        onClick={toggle}
       >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
      </div> */}
      <MyDropDown title={`Управление аккаунтами`}>
        <Nav vertical>
            <NavItem>
              <MyLink to="/accounts">Аккаунты</MyLink>
            </NavItem>
            <NavItem>
              <MyLink to="/create-account">Создать аккаунт</MyLink>
            </NavItem>
            <NavItem>
              <MyLink to="/roles">Роли</MyLink>
            </NavItem>
            <NavItem>
              <MyLink to="/add-role">Добавить роль</MyLink>
            </NavItem>
          </Nav>
      </MyDropDown>
      <MyDropDown title={'Интеграция'}>
        <Nav vertical>
            <NavItem>
              <MyLink to="/partners">Мерчанты</MyLink>
            </NavItem>
            <NavItem>
              <MyLink to="/acquirers">Банки</MyLink>
            </NavItem>
        </Nav>
      </MyDropDown>
      <MyDropDown title={'Транзакции'}>
        <Nav vertical>
            <NavItem>
              <MyLink to="/transactions">Транзакции</MyLink>
            </NavItem>
        </Nav>
      </MyDropDown>

   
 
    </div>
  );
};

export default SideMenu;
