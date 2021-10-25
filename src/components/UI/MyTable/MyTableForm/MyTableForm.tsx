import React from 'react'
// @ts-ignore
import { Button } from 'reactstrap'

import styles from './MyTableForm.module.scss'

const MyTableForm = ({
  className, onSubmit, children, isValid, buttonText='Добавить', resetForm, ...props
}: any) => {

    const cls = [
        styles.MyTableForm,
        className
    ]

    const onReset = resetForm || (() => console.log('нет функции очистки'))



    return (
        <div className={cls.join(' ')}>
           <form onSubmit={onSubmit}>
                <div>
                   {children}
                </div>


               <div className={styles.buttonsWrap} >
                <Button
                        color={isValid? "primary": 'secondary'}
                        disabled={!isValid}
                        className={styles.button}
                    >
                    
                        {buttonText}
                    </Button>

                    { resetForm && (
                        <Button
                            type='reset'
                            className={styles.button}
                            onClick={onReset}
                        >
                            очистить
                        </Button>
                    )}
               </div>

            </form>
        </div>
    )
}

export default MyTableForm