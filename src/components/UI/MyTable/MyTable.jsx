import React from 'react'
import DivTable from '../DivTable/DivTable'

import styles from './MyTable.module.scss'

const MyTable = ({className, children, ...props}) => {

    const cls = [
        styles.MyTable,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <DivTable>
                    {children}
            </DivTable>
        </div>
    )
}

export default MyTable