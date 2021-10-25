// @ts-nocheck
import { AppDispatch } from './../store';
import myAxios from '../../configs/modified-axios'
import { makeRes } from '../../utils/utils'
import { SET_TERMINALS, SET_TERMINAL_DETAILS, TERMINALS_LOADING, TERMINALS_FAILURE, TERMINALS_SUCCESS } from './actionTypes'


export const createTerminalThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    try {

      const res = await myAxios.post(`/api/admin/add_terminal`, inputData)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertTerminalsSuccess({create: 'Услуга добавлен успешно'}))
          return makeRes(true, 'Услуга добавлен успешно')
        } else {
          dispatch(alertTerminalsFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertTerminalsFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 

export const getTerminalsThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_terminals`, filterData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(getTerminalsSuccess( res.data.result.terminals))
        return makeRes()
      } else {
        dispatch(alertTerminalsFailure({ terminals: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertTerminalsFailure({ terminals: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const getTerminalDetailsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_terminals_by_uuids`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(setTerminalDetails( res.data.result.terminals[0]))
        return makeRes()
      } else {
        dispatch(alertTerminalsFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertTerminalsFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const updateTerminalThunk = (terminalData) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/update_terminal`, terminalData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertTerminalsSuccess({update: 'информация об услуге успешно обновлена'}))
        return makeRes(true, 'информация об услуге успешно обновлена', res.data.result)
      } else {
        dispatch(alertTerminalsFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertTerminalsFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const deleteTerminalsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/delete_terminals`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertTerminalsSuccess({delete: 'Услуга успешно удалена'}))
        return makeRes(true, 'Услуга успешно удалена')
      } else {
        dispatch(alertTerminalsFailure({ delete: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 

    } catch (error) {
      console.log(error);
      dispatch(alertTerminalsFailure({ delete: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setTerminalsLoading = (status) => {
  return {
    type: TERMINALS_LOADING,
    status
  }
}



export const getTerminalsSuccess = (terminals) => {
  return {
    type: SET_TERMINALS,
    terminals
  }
}

export const setTerminalDetails = (details) => {
  return {
    type: SET_TERMINAL_DETAILS,
    details
  }
}



export const alertTerminalsFailure = (errors) => {
  return {
    type: TERMINALS_FAILURE,
    errors
  }
}
export const alertTerminalsSuccess = (message) => {
  return {
    type: TERMINALS_SUCCESS,
    message
  }
}


