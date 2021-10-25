import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import MyButton from '../../UI/MyButton/MyButton'

import styles from './AddButtonAndPagination.module.scss'

const AddButtonAndPagination = ({
  className, onPreviousClick, onNextClick, buttonText='Добавить', onClick,
  color='primary',
  ...props}) => {

    const cls = [
        styles.AddButtonAndPagination,
        className
    ]

    return (
        <div className={cls.join(' ')}>
             <MyButton
                color={color}
                onClick={onClick}
                buttonText={buttonText}
            />

            <Pagination className={styles.Pagination} aria-label="Page navigation">
             
                <PaginationItem>
                    <PaginationLink 
                        onClick={onPreviousClick}
                        previous href="#" />
                </PaginationItem>
             
                <PaginationItem>
                    <PaginationLink 
                        onClick={onNextClick}
                        next href="#" />
                </PaginationItem>
              
            </Pagination>
        </div>
    )
}

export default AddButtonAndPagination