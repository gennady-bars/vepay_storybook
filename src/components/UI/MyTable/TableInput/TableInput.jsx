import React, { useEffect, useState } from 'react'
import DivTableRow from '../../DivTable/DivTableRow/DivTableRow'
import DivTableTD from '../../DivTable/DivTableTD/DivTableTD'
import DivTableTH from '../../DivTable/DivTableTH/DivTableTH'
import MyInput from '../../MyInput/MyInput'

import styles from './TableInput.module.scss'

const TableInput = ({
  className, label, column, DivTableTDcls, DivTableTHcls, ...props
}) => {
    const [inputId, setInputId] = useState('')

    useEffect(() => {
      setInputId(`${props.name}${String(Math.random()).slice(2)}`)
      // eslint-disable-next-line
    }, [])

    const cls = [
        styles.TableInput,
        column && styles.column,
        className,
    ]

    return (
        <DivTableRow className={cls.join(' ')}>
              <DivTableTH className={DivTableTHcls}>
                <label htmlFor={inputId}>{label}</label>
              </DivTableTH>
              <DivTableTD className={DivTableTDcls}>
                  <MyInput
                    className={styles.MyInput}
                      inputStyles={styles.inputStyles}
                      {...props}
                      id={inputId}
                  />
              </DivTableTD>
        </DivTableRow>
    )
}

export default TableInput