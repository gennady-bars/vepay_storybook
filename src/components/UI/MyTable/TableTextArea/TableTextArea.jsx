import React, { useEffect, useState } from 'react'
import DivTableRow from '../../DivTable/DivTableRow/DivTableRow'
import DivTableTD from '../../DivTable/DivTableTD/DivTableTD'
import DivTableTH from '../../DivTable/DivTableTH/DivTableTH'

import styles from './TableTextArea.module.scss'

const TableTextArea = ({className, label, ...props}) => {

  const [inputId, setInputId] = useState('')

  useEffect(() => {
    setInputId(`${String(Math.random()).slice(2)}`)
  }, [])

    const cls = [
        styles.TableTextArea,
        className
    ]

    return (
      <DivTableRow className={cls.join(' ')}>
          <DivTableTH
             className={styles.DivTableTH}
          >
            <label htmlFor={inputId}>{label}</label>
          </DivTableTH>
          <DivTableTD
            className={styles.DivTableTD}
          >
              <textarea 
                  id={inputId} 
                  {...props}
                  >
              </textarea>
          </DivTableTD>
    </DivTableRow>
    )
}

export default TableTextArea