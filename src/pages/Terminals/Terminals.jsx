import React from 'react'

import styles from './Terminals.module.scss'

const Terminals = ({className, ...props}) => {

    const cls = [
        styles.Terminals,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <h1>Terminals</h1>
        </div>
    )
}

export default Terminals