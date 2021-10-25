import React from 'react'
import { NavLink as RRNavLink } from "react-router-dom";
import { NavLink } from 'reactstrap';

import styles from './MyLink.module.scss'

const MyLink = (props) => {

    return (
      <NavLink tag={RRNavLink} 
        className={styles.MyLink}
        {...props} 
        activeStyle={{
          fontWeight: "bold",
          color: "#A31FED"
        }}
      >{props.children}</NavLink>
    )
}

export default MyLink