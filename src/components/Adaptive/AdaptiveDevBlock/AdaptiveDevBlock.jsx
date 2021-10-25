import React from 'react'

import styles from './AdaptiveDevBlock.module.scss'

const AdaptiveDevBlock = ({children}) => {

    return (
        <div className={styles.AdaptiveDevBlock}>
            {children}
        </div>
    )
}

export default AdaptiveDevBlock