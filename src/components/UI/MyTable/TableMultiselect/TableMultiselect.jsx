import React, { useEffect, useState } from 'react'
import {useMediaQuery} from '@react-hook/media-query'
import { Multiselect } from 'multiselect-react-dropdown';

import styles from './TableMultiselect.module.scss'
import DivTableRow from '../../DivTable/DivTableRow/DivTableRow';
import DivTableTH from '../../DivTable/DivTableTH/DivTableTH';
import DivTableTD from '../../DivTable/DivTableTD/DivTableTD';

const TableMultiselect = ({
    className, label, multiRef, DivTableTHcls, ...props
}) => {

    const matches = useMediaQuery('(min-width: 900px)')

    const [inputId, setInputId] = useState('')

    useEffect(() => {
        setInputId(`${String(Math.random()).slice(2)}`)
      }, [])

    const cls = [
        styles.TableMultiselect,
        className
    ]

    return (
        <DivTableRow className={cls.join(' ')}>
            <DivTableTH className={DivTableTHcls}>
            {label}
            </DivTableTH>
            <DivTableTD>
                <Multiselect
                    emptyRecordMsg='Нет данных'
                    id={inputId}
                    {...props}
                    ref={multiRef}
                    style={{ 
                        multiselectContainer: { 
                            margin: '1rem',
                            marginLeft: '0rem',
                            paddingLeft: matches? `2rem`: '0'
                            // width: '80%'
                        },
                    }}
                />
            </DivTableTD>
        </DivTableRow>
    )
}

export default TableMultiselect