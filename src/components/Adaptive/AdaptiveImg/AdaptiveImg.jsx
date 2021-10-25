import React from 'react'

import styles from './AdaptiveImg.module.scss'

const AdaptiveImg = ({image}) => {

    return (
        <div className={styles.AdaptiveImg}>
            <img src={image} alt="AdaptiveImg"/>
        </div>
    )
}

export default AdaptiveImg