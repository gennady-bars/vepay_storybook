// @ts-nocheck
import { AppDispatch } from './../store';
import myAxios from '../../configs/modified-axios'
import { makeRes } from '../../utils/utils';
import { ACQUIRERS_FAILURE, ACQUIRERS_LOADING, ACQUIRERS_SUCCESS, SET_ACQUIRERS, SET_ACQUIRER_DETAILS } from './actionTypes';


export const createAcquirerThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    try {

      const res = await myAxios.post(`/api/admin/add_acquirer`, inputData)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertAcquirersSuccess({create: 'Эквайер добавлен успешно'}))
          return makeRes(true, 'Эквайер добавлен успешно')
        } else {
          dispatch(alertAcquirersFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertAcquirersFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 

export const getAcquirersThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_acquirers`, filterData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(getAcquirersSuccess( res.data.result.acquirers))
        return makeRes()
      } else {
        dispatch(alertAcquirersFailure({ acquirers: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertAcquirersFailure({ acquirers: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const getAcquirerDetailsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_acquirers_by_uuids`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(setAcquirerDetails( res.data.result.acquirers[0]))
        return makeRes()
      } else {
        dispatch(alertAcquirersFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertAcquirersFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const updateAcquirerThunk = (acquirerData) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/update_acquirer`, acquirerData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertAcquirersSuccess({update: 'информация о эквайере успешно обновлена'}))
        return makeRes(true, 'информация о эквайере успешно обновлена', res.data.result)
      } else {
        dispatch(alertAcquirersFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertAcquirersFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const deleteAcquirersThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/delete_acquirers`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertAcquirersSuccess({delete: 'Эквайер успешно удалён'}))
        return makeRes(true, 'Эквайер успешно удалён')
      } else {
        dispatch(alertAcquirersFailure({ delete: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 

    } catch (error) {
      console.log(error);
      dispatch(alertAcquirersFailure({ delete: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setAcquirersLoading = (status) => {
  return {
    type: ACQUIRERS_LOADING,
    status
  }
}



export const getAcquirersSuccess = (acquirers) => {
  return {
    type: SET_ACQUIRERS,
    acquirers
  }
}

export const setAcquirerDetails = (details) => {
  return {
    type: SET_ACQUIRER_DETAILS,
    details
  }
}



export const alertAcquirersFailure = (errors) => {
  return {
    type: ACQUIRERS_FAILURE,
    errors
  }
}
export const alertAcquirersSuccess = (message) => {
  return {
    type: ACQUIRERS_SUCCESS,
    message
  }
}


