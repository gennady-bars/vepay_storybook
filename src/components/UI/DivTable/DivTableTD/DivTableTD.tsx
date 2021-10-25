import React from 'react'

import styles from './DivTableTD.module.scss'

const DivTableTD = ({className, children, ...props}: any) => {

    const cls = [
        styles.DivTableTD,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default DivTableTD