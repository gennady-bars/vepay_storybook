import React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useMediaQuery } from "@react-hook/media-query";
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import Main from '../../components/Main/Main'
import SideMenu from '../../components/SideMenu/SideMenu'
import { refreshToken, setIsLoggedIn } from '../../redux/actions/loginActions'
import { getAccessExpiry } from '../../utils/utils'

import styles from './Layout.module.scss'

const Layout = ({isLoggedIn, refreshToken, setIsLoggedIn}) => {

    const matches = useMediaQuery('(min-width: 768px)')
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
  
  
    useEffect(() => {
      setIsOpen(matches)
    }, [matches])

    useEffect(() => {
        const tokenTime = getAccessExpiry()
        if (!tokenTime) return
        const isExpired = Date.now() >= tokenTime
        const delay = Math.floor((tokenTime - Date.now()))
        let timer;
        console.log(delay);
        if (isExpired) {
            refreshToken()
        } else {
            setIsLoggedIn(true)
            timer = setTimeout(() => {
                refreshToken()
            }, delay )
        }
        return () => clearTimeout(timer)
    },[refreshToken, setIsLoggedIn])

    if (!isLoggedIn) {
        return (
            <Login/>
        )
    }

    return (
        <div className={styles.Layout}>
            <Header
                isOpen={isOpen}
                toggle={toggle}
            />
            <div className='d-flex'>
                <SideMenu
                    isOpen={isOpen}
                    toggle={toggle}
                />
                <Main/>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        // errors: state.login.errors,
        // loading: state.login.loading,
    }
}


export default connect(mapStateToProps, {refreshToken, setIsLoggedIn})(Layout)