import React from 'react'

import styles from './DivTable.module.scss'

const DivTable = ({className, children, ...props}: any) => {

    const cls = [
        styles.DivTable,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}

export default DivTable