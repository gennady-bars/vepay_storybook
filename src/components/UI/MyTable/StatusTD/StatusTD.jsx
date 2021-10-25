import React from 'react'

import styles from './StatusTD.module.scss'

const StatusTD = ({className, active, ...props}) => {

    const cls = [
        styles.StatusTD,
        className
    ]

    return (
        <td className={cls.join(' ')}>
        <span className={active? styles.active: styles.notActive}>
           {(active && 'активен') || 'неактивен'}
        </span>
        </td>
    )
}

export default StatusTD