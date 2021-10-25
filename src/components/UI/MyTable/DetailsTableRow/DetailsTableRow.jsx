import React from 'react'
import DivTableRow from '../../DivTable/DivTableRow/DivTableRow'
import DivTableTD from '../../DivTable/DivTableTD/DivTableTD'
import DivTableTH from '../../DivTable/DivTableTH/DivTableTH'

import styles from './DetailsTableRow.module.scss'

const DetailsTableRow = ({
  className, data, label, column, ...props
}) => {

    const checkData = (data) => {
      if (data === undefined) return 'нет данных' 
      if (data === null) return 'нет данных' 
      return data
    }

    const cls = [
        styles.DetailsTableRow,
        column && styles.column,
        className
    ]

    return (
        <DivTableRow className={cls.join(' ')}>
                    <DivTableTH className={styles.DivTableTH} >
                        {label}
                    </DivTableTH>
                    <DivTableTD >
                      <span className={styles.span}>
                        {checkData(data)}
                      </span>
                    </DivTableTD>
        </DivTableRow>
    )
}

export default DetailsTableRow