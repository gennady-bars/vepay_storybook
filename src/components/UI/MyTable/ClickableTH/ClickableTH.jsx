import React from 'react'

import styles from './ClickableTH.module.scss'

const ClickableTH = ({
    className, label, onClick, thisField='', sortField, order, ...props}) => {

    const cls = [
        styles.ClickableTH,
        className
    ]

    if (thisField === sortField) {
        cls.push(order? styles.arrowUp: styles.arrowDown)
    }

    return (
        <th onClick={onClick} className={cls.join(' ')}>
           {label}
        </th>
    )
}

export default ClickableTH