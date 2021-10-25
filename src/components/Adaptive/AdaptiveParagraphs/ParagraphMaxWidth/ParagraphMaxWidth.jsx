import React from 'react'

import styles from './ParagraphMaxWidth.module.scss'

const ParagraphMaxWidth = ({className, children, type='gray', ...props}) => {

    const cls = [
        styles.ParagraphMaxWidth,
        styles[type],
        className
    ]

    return (
        <p className={cls.join(' ')}>
            {children}
        </p>
    )
}

export default ParagraphMaxWidth