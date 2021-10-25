// @ts-nocheck
// import myAxios from '../../configs/modified-axios'
import { AppDispatch } from './../store';
import {rolesAxios as myAxios} from '../../configs/modified-axios'

import { getAccessToken, makeRes } from '../../utils/utils'
import { ROLES_LOADING, SET_ROLES_DETAILS, ROLES_FAILURE, SET_ROLES, ROLES_SUCCESS } from './actionTypes'


export const createRoleThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    
    try {
      
      const data = {
        ...inputData,
        access_token: getAccessToken(),
      }
      const res = await myAxios.post(`/api/add_role`, data)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertRolesSuccess({create: 'Роль добавлена успешно'}))
          return makeRes(true, 'Роль добавлена успешно', res.data.result)
        } else {
          dispatch(alertRolesFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertRolesFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 


export const getRolesThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setRolesLoading(true))

    try {
      const data = {
        access_token: getAccessToken(),
        ...filterData,
      }
      const res = await myAxios.post(`/api/get_roles`, data)
      console.log(res);
      if (res.status === 200 && res.data.result) {
        dispatch(alertRolesFailure({ roles: null }))
        dispatch(setRoles(res.data.result.roles))
        return makeRes()
      } else {
        dispatch(alertRolesFailure({ roles: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      dispatch(alertRolesFailure({ roles: [error.message] }))
      return makeRes(false, [error.message])
    } finally {
      dispatch(setRolesLoading(false))
    }
  }
}


export const getRoleDetailsThunk = (ids) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setRolesLoading(true))

    try {

      const data = {
        access_token: getAccessToken(),
        ids
      }
      const res = await myAxios.post(`/api/get_roles_by_ids`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
          dispatch(alertRolesFailure({ details: null }))
        dispatch(setRoleDetails(res.data.result.roles[0]))
        return makeRes()
      } else {
        dispatch(alertRolesFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      }
    } catch (error) {
      console.log(error);
      dispatch(alertRolesFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    } finally {
      dispatch(setRolesLoading(false))
    }
  }
}

export const updateRoleThunk = (roleData) => {
  return async (dispatch: AppDispatch) => {
    
    try {
      const data = {
        access_token: getAccessToken(),
        ...roleData
      }
      const res = await myAxios.post(`/api/update_role`, data)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertRolesSuccess({update: 'информация о роли успешно обновлена'}))
        return makeRes(true, 'информация о роли успешно обновлена')
      } else {
        dispatch(alertRolesFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertRolesFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setRolesLoading = (status) => {
  return {
    type: ROLES_LOADING,
    status
  }
}

export const alertRolesFailure = (errors) => {
  return {
    type: ROLES_FAILURE,
    errors
  }
}

export const alertRolesSuccess = (message) => {
  return {
    type: ROLES_SUCCESS,
    message
  }
}

export const setRoles = (roles) => {
  return {
    type: SET_ROLES,
    roles
  }
}

export const setRoleDetails = (details) => {
  return {
    type: SET_ROLES_DETAILS,
    details
  }
}