import React, { useState } from 'react'
import { Button, Collapse } from 'reactstrap'

import styles from './MyCollapse.module.scss'

const MyCollapse = ({
  className, children, color="primary", buttonText='Показать фильтр', ...props
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


    const cls = [
        styles.MyCollapse,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <Button 
              color={isOpen? color : 'success'} 
              onClick={toggle}
              className={styles.button}
            >
            {isOpen? 'Скрыть фильтр' : buttonText}
            </Button>
            <Collapse isOpen={isOpen}>
              {children}
            </Collapse>
        </div>
    )
}

export default MyCollapse