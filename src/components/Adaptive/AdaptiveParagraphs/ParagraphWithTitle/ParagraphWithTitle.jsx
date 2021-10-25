import React from 'react'

import styles from './ParagraphWithTitle.module.scss'

const ParagraphWithTitle = ({title, text, className}) => {

    const cls = [
        styles.ParagraphWithTitle,
        className
    ]

    return (
        <p className={cls.join(' ')}>
            <span>{title}</span> 
            {text}
        </p>
    )
}

export default ParagraphWithTitle