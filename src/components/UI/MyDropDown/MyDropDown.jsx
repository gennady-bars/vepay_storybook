import React, { Fragment } from 'react'
import { UncontrolledCollapse } from 'reactstrap'

import styles from './MyDropDown.module.scss'

const MyDropDown = ({title, children, className, ...props}) => {

  const id = 'toggler' +  Math.random().toString().slice(2)

  const cls = [
    styles.MyDropDown,
    className
  ]

    return (
        <Fragment>
          <p id={id} className={cls.join(' ')} >{title}</p>
          <UncontrolledCollapse toggler={`#${id}`}>
            {children}
          </UncontrolledCollapse>
          <hr />
        </Fragment>
    )
}

export default MyDropDown