import React from 'react'

import styles from './Spinner.module.scss'

const Spinner = ({className}) => {

  const cls = [
    styles.Spinner,
    className
  ]

    return (
        <div className={cls.join(' ')}>
           <div className={styles["lds-spinner"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner