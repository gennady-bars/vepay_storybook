import React from 'react'

import styles from './AdaptiveColumn.module.scss'

const AdaptiveColumn = ({header, children, className, headerStyles}) => {

    const cls = [
        styles.AdaptiveColumn,
        className
    ]

    const headerCls = [
        styles.header,
        headerStyles
    ]

    return (
        <div className={cls.join(' ')}>
            {header && <h1 className={headerCls.join(' ')}>{header}</h1>}

            {children}
        </div>
    )
}

export default AdaptiveColumn