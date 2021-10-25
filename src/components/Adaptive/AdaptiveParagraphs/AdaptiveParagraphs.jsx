import React from 'react'

import styles from './AdaptiveParagraphs.module.scss'

const AdaptiveParagraphs = ({children, className, ...props}) => {

    const cls = [
        styles.AdaptiveParagraphs,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default AdaptiveParagraphs