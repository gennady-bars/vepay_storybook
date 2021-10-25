import React from 'react'
import { Table } from 'reactstrap'

import styles from './HoverTable.module.scss'

const HoverTable = ({className, children, ...props}) => {

    const cls = [
        styles.HoverTable,
        className
    ]

    return (
        <div className={cls.join(' ')}>
          <Table hover>
            {children}
          </Table>
        </div>
    )
}

export default HoverTable