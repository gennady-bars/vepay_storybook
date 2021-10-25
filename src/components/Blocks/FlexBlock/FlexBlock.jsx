import React from 'react'

import styles from './FlexBlock.module.scss'

const FlexBlock = ({className, children, ...props}) => {

    const cls = [
        styles.FlexBlock,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default FlexBlock