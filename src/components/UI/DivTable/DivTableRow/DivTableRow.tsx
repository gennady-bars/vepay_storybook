import React from 'react'

import styles from './DivTableRow.module.scss'

const DivTableRow = ({className, children, ...props}: any) => {

    const cls = [
        styles.DivTableRow,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default DivTableRow