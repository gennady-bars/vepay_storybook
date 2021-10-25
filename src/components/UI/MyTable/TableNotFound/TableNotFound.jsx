import React from 'react'

import styles from './TableNotFound.module.scss'

const TableNotFound = ({className, ...props}) => {

    const cls = [
        styles.TableNotFound,
        className
    ]

    return (
        <tr className={cls.join(' ')}>
            <th>
                <h1>Ничего не найдено</h1>
            </th>
        </tr>
    )
}

export default TableNotFound