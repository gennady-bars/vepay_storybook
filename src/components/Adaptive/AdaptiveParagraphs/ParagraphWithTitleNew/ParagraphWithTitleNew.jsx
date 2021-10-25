import React from 'react'

import styles from './ParagraphWithTitleNew.module.scss'

const ParagraphWithTitleNew = ({title, text, className}) => {

  const cls = [
    styles.ParagraphWithTitleNew,
    className
]

    return (
        <div  className={cls.join(' ')}>
            <h2>{title}</h2>
            <p>
              {text}
            </p>
        </div>
    )
}

export default ParagraphWithTitleNew