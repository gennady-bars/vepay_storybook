// @ts-nocheck
import { AppDispatch } from './../store';
// import myAxios from '../../configs/modified-axios'
import {accountAxios as myAxios} from '../../configs/modified-axios'

import { getAccessToken, makeRes } from '../../utils/utils'
import { ACCOUNT_ROLES_LOADING, SET_ACCOUNT_ROLES_DETAILS, ACCOUNT_ROLES_FAILURE, SET_ACCOUNT_ROLES, ACCOUNT_ROLES_SUCCESS } from './actionTypes'


export const createAccountRoleThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    
    try {
      
      const data = {
        ...inputData,
        access_token: getAccessToken(),
      }
      const res = await myAxios.post(`/api/add_account_role`, data)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertAccountRolesSuccess({create: 'Роль добавлена успешно'}))
          return makeRes(true, 'Роль добавлена успешно', res.data.result)
        } else {
          dispatch(alertAccountRolesFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertAccountRolesFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 


export const getAccountRolesThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAccountRolesLoading(true))

    try {
      const data = {
        access_token: getAccessToken(),
        ...filterData,
      }
      const res = await myAxios.post(`/api/get_accounts_roles`, data)
      console.log(res);
      if (res.status === 200 && res.data.result) {
        dispatch(alertAccountRolesFailure({ accountRoles: null }))
        dispatch(setAccountRoles(res.data.result.accounts_roles))
        return makeRes()
      } else {
        dispatch(alertAccountRolesFailure({ accountRoles: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      dispatch(alertAccountRolesFailure({ accountRoles: [error.message] }))
      return makeRes(false, [error.message])
    } finally {
      dispatch(setAccountRolesLoading(false))
    }
  }
}

export const getAccountRoleDetailsThunk = (ids) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAccountRolesLoading(true))

    try {

      const data = {
        access_token: getAccessToken(),
        ids
      }
      const res = await myAxios.post(`/api/get_accounts_roles_by_ids`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
          dispatch(alertAccountRolesFailure({ details: null }))
        dispatch(setAccountRoleDetails(res.data.result.accounts_roles[0]))
        return makeRes()
      } else {
        dispatch(alertAccountRolesFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      }
    } catch (error) {
      console.log(error);
      dispatch(alertAccountRolesFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    } finally {
      dispatch(setAccountRolesLoading(false))
    }
  }
}

export const updateAccountRoleThunk = (accountRoleData) => {
  return async (dispatch: AppDispatch) => {
    
    try {
      const data = {
        access_token: getAccessToken(),
        ...accountRoleData
      }
      const res = await myAxios.post(`/api/update_account_role`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertAccountRolesSuccess({update: 'информация о роли успешно обновлена'}))
        return makeRes(true, 'информация о роли успешно обновлена')
      } else {
        dispatch(alertAccountRolesFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertAccountRolesFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setAccountRolesLoading = (status) => {
  return {
    type: ACCOUNT_ROLES_LOADING,
    status
  }
}

export const alertAccountRolesFailure = (errors) => {
  return {
    type: ACCOUNT_ROLES_FAILURE,
    errors
  }
}

export const alertAccountRolesSuccess = (message) => {
  return {
    type: ACCOUNT_ROLES_SUCCESS,
    message
  }
}

export const setAccountRoles = (accountRoles) => {
  return {
    type: SET_ACCOUNT_ROLES,
    accountRoles
  }
}

export const setAccountRoleDetails = (details) => {
  return {
    type: SET_ACCOUNT_ROLES_DETAILS,
    details
  }
}