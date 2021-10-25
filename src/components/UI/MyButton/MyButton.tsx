import React from 'react'
// @ts-ignore
import { Button } from 'reactstrap'

import styles from './MyButton.module.scss'

const MyButton = ({
  className='', onClick=(() => {}), color='secondary', buttonText='Сохранить', ...props
}) => {

    const cls = [
        styles.MyButton,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <Button
                color={color}
                onClick={onClick}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default MyButton