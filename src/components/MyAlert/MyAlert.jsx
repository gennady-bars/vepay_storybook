import React, { useEffect, useState } from 'react'
import { Alert } from 'reactstrap'

import styles from './MyAlert.module.scss'

const MyAlert = ({className, ...props}) => {

  const [visible, setVisible] = useState(true);
  const [alertMessage, setAlertMessage] = useState('Всё отлично!');

  const onDismiss = () => setVisible(false);

    const cls = [
        styles.MyAlert,
        className
    ]

    useEffect(() => {
      if (visible) {
        setTimeout(() => {
          setVisible(false)
        }, 3000)
      }

    }, [visible])

    return (
        <div className={cls.join(' ')}>
              <Alert color="success" isOpen={visible} toggle={onDismiss}>
                <h4 className="alert-heading">{alertMessage}</h4>
                <p>
                  Запись добавлена успешно
                </p>
                <hr />
                <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                </p>
              </Alert>
        </div>
    )
}

export default MyAlert