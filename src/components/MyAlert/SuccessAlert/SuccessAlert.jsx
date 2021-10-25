import React, { useEffect } from 'react'
import { Alert } from 'reactstrap'

import styles from './SuccessAlert.module.scss'

const SuccessAlert = ({
  className, alertHeading='Всё отлично!', message='Запись добавлена успешно',
  bottomMessage='', visible=false, setVisible, timeout=3000,
  ...props}) => {


  const onDismiss = () => setVisible(false);


    useEffect(() => {
      let timer;

      if (visible) {
       timer = setTimeout(() => {
          onDismiss()
        }, timeout)
      }

      return () => {
        clearTimeout(timer)
      }
      // eslint-disable-next-line
    }, [visible])

    const cls = [
        styles.SuccessAlert,
        className
    ]


    return (
        <div className={cls.join(' ')}>
             <Alert color="success" isOpen={visible} toggle={onDismiss}>
                <h4 className="alert-heading">{alertHeading}</h4>
                <p>
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

export default SuccessAlert