import React from 'react'
import MyButton from '../MyButton'

import styles from './BlockingButton.module.scss'

const BlockingButton = ({
  className, onActivate, onBlock, blocked, ...props
}) => {

    const cls = [
        styles.BlockingButton,
        className
    ]

    return (
        <div className={cls.join(' ')}>
            <MyButton
                color={blocked? 'success' : 'danger'}
                onClick={blocked? onActivate : onBlock}
                buttonText={blocked? 'активировать' : 'заблокировать'}
            />
        </div>
    )
}

export default BlockingButton