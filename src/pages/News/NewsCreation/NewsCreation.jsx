import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'reactstrap'
import { createNewsThunk } from '../../../redux/actions/blogActions'

import styles from './NewsCreation.module.scss'



const NewsCreation = ({createNewsThunk, }) => {
    const [short, setShort] = useState('')
    const [full, setFull] = useState('')
    const [picture, setPicture] = useState('')
    console.log(picture);

    const fileInput = useRef()

    useEffect(() => {
        // getNewsDetailsThunk(match.params.id)
        // eslint-disable-next-line
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(fileInput.current.files[0]);
        let ok = window.confirm('Вы действительно хотите создать новость?')
        if (ok) {
            console.log('ok');
            // history.push('/news')
            createNewsThunk({
                
            })
        }
    }

    return (
        <div className={styles.NewsCreation}>
            <h1>Создание новости</h1>
            <form onSubmit={onSubmit} >
                <h3>Добавить картинку новости</h3>
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
                    disabled={!(short && full && picture)}
                >
                    Создать новость
                </Button>
            </form>
        </div>
    )
}

export default connect(null, {createNewsThunk})(NewsCreation)