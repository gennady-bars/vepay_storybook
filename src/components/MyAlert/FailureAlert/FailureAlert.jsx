import React from 'react'
import { Alert } from 'reactstrap'

import styles from './FailureAlert.module.scss'

const FailureAlert = ({
  className, alertHeading='Ошибка!', message='Что-то пошло не так',
  bottomMessage='', visible=false, setVisible,
  ...props}) => {

  const onDismiss = () => setVisible(false);


    const cls = [
        styles.FailureAlert,
        className
    ]

    return (
        <div className={cls.join(' ')}>
             <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                <h4 className="alert-heading">{alertHeading}</h4>
                <p className={styles.mainMessage}>
                  {message}
                </p>
                <hr />
                <p className="mb-0">
                  {bottomMessage}
                </p>
              </Alert>
        </div>
    )
}

export default FailureAlert