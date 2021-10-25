import React from 'react'

import styles from './MyInput.module.scss'

const MyInput = ({className, type='text', inputStyles, value='', onChange, 
label, errorText, ...props}) => {

    const cls = [
        styles.MyInput,
        className
    ]

    const inputCls = [
      styles.input,
      inputStyles,
    ]

    const handleInputChange = onChange? onChange: () => console.log('add onChange')

    return (
        <div className={cls.join(' ')}>
              <input 
                {...props}
                className={inputCls.join(' ')}
                type={type} 
                value={value}
                onChange={handleInputChange}
              />
           { errorText && ( 
              <>
              <br/>
                <span className={styles.error} >{errorText}</span>
              </>
            )}
        </div>
    )
}

export default MyInput