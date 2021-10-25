// @ts-nocheck
import { AppDispatch } from './../store';
// import myAxios from '../../configs/modified-axios'
import {accountAxios as myAxios} from '../../configs/modified-axios'

// import { mockAccounts } from '../../utils/mock-accounts'
import { getAccessToken, makeRes } from '../../utils/utils'
import { ACCOUNTS_LOADING, SET_ACCOUNTS_DETAILS, ACCOUNTS_FAILURE, SET_ACCOUNTS, ACCOUNTS_SUCCESS } from './actionTypes'


export const createAccountThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    
    try {
      
      const data = {
        ...inputData,
        access_token: getAccessToken(),
      }
      const res = await myAxios.post(`/api/add_account`, data)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertAccountsSuccess({create: 'Аккаунт добавлен успешно'}))
          return makeRes(true, 'Аккаунт добавлен успешно', res.data.result)
        } else {
          dispatch(alertAccountsFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertAccountsFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 


export const getAccountsThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAccountsLoading(true))

    try {
      // dispatch(setAccounts(mockAccounts)) // TEST
      const data = {
        access_token: getAccessToken(),
        ...filterData,
      }
      const res = await myAxios.post(`/api/get_accounts`, data)
      console.log(res);
      if (res.status === 200 && res.data.result) {
        dispatch(alertAccountsFailure({ accounts: null }))
        dispatch(setAccounts(res.data.result.accounts))
        return makeRes()
      } else {
        dispatch(alertAccountsFailure({ accounts: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      dispatch(alertAccountsFailure({ accounts: ['Сервер недоступен'] }))
      return makeRes(false, [error.message])
    } finally {
      dispatch(setAccountsLoading(false))
    }
  }
}

export const getAccountDetailsThunk = (ids) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAccountsLoading(true))

    try {
      // dispatch(setAccountDetails(mockAccounts.find((account) => account.id === +id))) // TEST

      const data = {
        access_token: getAccessToken(),
        ids
      }
      const res = await myAxios.post(`/api/get_accounts_by_ids`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
          dispatch(alertAccountsFailure({ details: null }))
        dispatch(setAccountDetails(res.data.result.accounts[0]))
        return makeRes()
      } else {
        dispatch(alertAccountsFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      }
    } catch (error) {
      console.log(error);
      dispatch(alertAccountsFailure({ details: ['Сервер недоступен'] }))
      return makeRes(false, [error.message])
    } finally {
      dispatch(setAccountsLoading(false))
    }
  }
}

export const updateAccountThunk = (accountData) => {
  return async (dispatch: AppDispatch) => {
    
    try {
      const data = {
        access_token: getAccessToken(),
        ...accountData
      }
      const res = await myAxios.post(`/api/update_account`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertAccountsSuccess({update: 'информация об аккаунте успешно обновлена'}))
        return makeRes(true, 'информация об аккаунте успешно обновлена', res.data.result)
      } else {
        dispatch(alertAccountsFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertAccountsFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setAccountsLoading = (status) => {
  return {
    type: ACCOUNTS_LOADING,
    status
  }
}

export const alertAccountsFailure = (errors) => {
  return {
    type: ACCOUNTS_FAILURE,
    errors
  }
}

export const alertAccountsSuccess = (message) => {
  return {
    type: ACCOUNTS_SUCCESS,
    message
  }
}

export const setAccounts = (accounts) => {
  return {
    type: SET_ACCOUNTS,
    accounts
  }
}

export const setAccountDetails = (details) => {
  return {
    type: SET_ACCOUNTS_DETAILS,
    details
  }
}