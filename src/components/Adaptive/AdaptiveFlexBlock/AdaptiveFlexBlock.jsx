import React from 'react'

import styles from './AdaptiveFlexBlock.module.scss'

const AdaptiveFlexBlock = ({children, className}) => {

  const cls = [
    styles.AdaptiveFlexBlock,
    className
  ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default AdaptiveFlexBlock