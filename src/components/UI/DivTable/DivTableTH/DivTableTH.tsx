import React from 'react'

import styles from './DivTableTH.module.scss'

const DivTableTH = ({className, children,  ...props}: any) => {

    const cls = [
        styles.DivTableTH,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default DivTableTH