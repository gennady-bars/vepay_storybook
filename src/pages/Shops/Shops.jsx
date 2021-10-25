import React from 'react'

import styles from './Shops.module.scss'

const Shops = ({className, ...props}) => {

    const cls = [
        styles.Shops,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <h1>Shops</h1>
        </div>
    )
}

export default Shops