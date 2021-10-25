// @ts-nocheck
import { AppDispatch } from './../store';
// import myAxios from '../../configs/modified-axios'
import {accountAxios as myAxios} from '../../configs/modified-axios'
import { clearLocalStorage, getAccessExpiry, getRefreshToken, setAccessExpiry, setAccessToken, setRefreshExpiry, setRefreshToken } from '../../utils/utils'
import { SET_IS_ADMIN, SET_IS_LOGGED_IN, SET_LOGIN_ERRORS, SET_LOGIN_LOADING,
  LOG_OUT, 
} from "./actionTypes"

let timer;

export const logInThunk = (loginData) => {
  return async (dispatch: AppDispatch) => {
    const data = {}
    Object.keys(loginData).forEach(key => {
      if (loginData[key].trim()) {
        data[key] = loginData[key].trim()
      }
    })
    dispatch(setLoginLoading(true))
    try {
      const res = await myAxios.post(`/api/login`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
          if (res.data.result['role_names'].includes('admin')) {
            dispatch(setIsAdmin(true))
            const authData = res.data.result
            dispatch(setLoginErrors(null))

            setAccessToken(authData['access_token'])
            setAccessExpiry(authData['access_token_expires_in'])
            setRefreshToken(authData['refresh_token'])
            setRefreshExpiry(authData['refresh_token_expires_in'])

            dispatch(setIsLoggedIn(true, authData))
            autoRefresh(() => dispatch(refreshToken()))

          } else {
            dispatch(setLoginErrors(['Недостаточно прав']))
          }
      } else {
        dispatch(setLoginErrors(res.data.errors))
        console.log(res.data.errors);
      }
    } catch (error) {
      dispatch(setLoginErrors(['Сервер временно недоступен']))
      console.log(error);
    } finally {
      dispatch(setLoginLoading(false))
    }
  }
}

export const refreshToken = () => {
  return async (dispatch: AppDispatch) => {
    const refToken = getRefreshToken()
    try {
      const res = await myAxios.post(`/api/refresh_token`, {refresh_token: refToken})
      console.log(res);
      if (res.status === 200 && res.data.result) {
        const authData = res.data.result
        dispatch(setLoginErrors(null))
         // ====== TEST =========
        setAccessToken(authData['access_token'])
        setAccessExpiry(authData['access_token_expires_in'])
        setRefreshToken(authData['refresh_token'])
        setRefreshExpiry(authData['refresh_token_expires_in'])
        // ====== TEST =========
        dispatch(setIsLoggedIn(true, authData))
        autoRefresh(() => dispatch(refreshToken()))

      } else {
        dispatch(logout())
        console.log('dispatch(logout())');
      }
    } catch (error) {
      console.log(error);
    }
  }
}



export const logout = () => {
  clearLocalStorage()
  clearTimeout(timer)
  return {
    type: LOG_OUT,
  }
}

export const autoRefresh = (refresh) => {
  console.log('autoRefresh ' + timer );
  clearTimeout(timer)
  const tokenTime = getAccessExpiry()
  const delay = Math.floor((tokenTime - Date.now()))
  timer = setTimeout(() => {
    refresh()
  }, delay)
}


export const setIsLoggedIn = (status, authData) => {
  
  return {
    type: SET_IS_LOGGED_IN,
    status,
    authData
  }
}

export const setIsAdmin = (isAdmin) => {
  return {
    type: SET_IS_ADMIN,
    isAdmin
  }
}

export const setLoginErrors = (errors) => {
  return {
    type: SET_LOGIN_ERRORS,
    errors
  }
}

export const setLoginLoading = (status) => {
  return {
    type: SET_LOGIN_LOADING,
    status
  }
}