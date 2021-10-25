import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Button, Input } from 'reactstrap'
import { deleteNewsThunk, getNewsDetailsThunk, updateNewsDetailsThunk } from '../../../redux/actions/blogActions'

import styles from './NewsDetails.module.scss'

const NewsDetails = ({
    details, 
    getNewsDetailsThunk, 
    updateNewsDetailsThunk, 
    deleteNewsThunk,
    history, 
    match, 
    ...props}) => {
    const [short, setShort] = useState(details.short)
    const [full, setFull] = useState(details.full)
    const [picture, setPicture] = useState('')
    console.log(picture);

    const fileInput = useRef()

    useEffect(() => {
        getNewsDetailsThunk(match.params.id)
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setShort(details.short)
        setFull(details.full)
    }, [details])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(fileInput.current.files[0]);
        let ok = window.confirm('Вы действительно хотите обновить новость?')
        if (ok) {
            console.log('ok');
            // history.push('/news')
            updateNewsDetailsThunk({
                id: details.id,
                short,
                full,
                picture
            })
        }
    }

    return details && (
        <div className={styles.NewsDetails}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/news' exact>Новости</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Детали новости</BreadcrumbItem>
        </Breadcrumb>
            <h1>Детали новости</h1>
            <form onSubmit={onSubmit} >
                <h3>Обновить фото</h3>
                <Input 
                    type='file' 
                    name='picture'
                    innerRef={fileInput}
                    onChange={() => setPicture(fileInput.current.files[0])}
                />
                <h3>Название новости (short)</h3>
                <textarea 
                    name="short" 
                    value={short}  
                    onChange={(e) => setShort(e.target.value)}
                    rows="3">
                </textarea>
                <h3>Полный текст (full)</h3>
                <textarea 
                    name="full" 
                    value={full}  
                    onChange={(e) => setFull(e.target.value)}
                    rows="20">
                </textarea>
                <Button 
                    color='success'
                >
                    Сохранить
                </Button>
            </form>
            <Button 
                color='danger'
                className='mt-3'
                onClick={() => console.log('delete')}
            >
                Удалить новость
            </Button>
            

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        details: state.blog.details,
    }
}


export default connect(mapStateToProps, {
    getNewsDetailsThunk, 
    updateNewsDetailsThunk,
    deleteNewsThunk,
})(NewsDetails)