import React, { useEffect, useState } from 'react'
import DivTableTD from '../DivTableTD/DivTableTD'
import DivTableTH from '../DivTableTH/DivTableTH'
import DivTableRow from '../DivTableRow/DivTableRow'
import MyInput from '../../MyInput/MyInput'
import styles from './DivTableInput.module.scss'

const DivTableInput = ({className, label,  ...props}: any) => {

  const [inputId, setInputId] = useState('')

  useEffect(() => {
      setInputId(`${label}${String(Math.random()).slice(2)}`)
    }, [label])

    const cls = [
        styles.DivTableInput,
        className
    ]

    return (
        <DivTableRow className={cls.join(' ')}>
            <DivTableTH>
              <label htmlFor={inputId}>{label}</label>
            </DivTableTH>

            <DivTableTD>
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

export default DivTableInput