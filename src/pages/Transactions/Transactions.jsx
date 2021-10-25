import React from 'react'

import styles from './Transactions.module.scss'

const Transactions = ({className, ...props}) => {

    const cls = [
        styles.Transactions,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <h1>Transactions</h1>
        </div>
    )
}

export default Transactions