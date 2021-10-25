import React, { useEffect, useState } from 'react'

import styles from './Footer.module.scss'

const Footer = (props) => {

    const [date, setDate] = useState()

    useEffect(() => {
        const currentYear = new Date().getFullYear()
        setDate(currentYear)
    }, [])

    return (
        <div className={styles.Footer}>
            <span>ООО "ПРОЦЕССИНГОВАЯ КОМПАНИЯ БЫСТРЫХ ПЛАТЕЖЕЙ" © 1999-{date}</span>
        </div>
    )
}

export default Footer