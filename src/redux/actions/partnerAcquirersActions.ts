// @ts-nocheck
import { AppDispatch } from './../store';
import myAxios from '../../configs/modified-axios'
import { makeRes } from '../../utils/utils'
import { SET_PARTNER_ACQUIRERS, SET_PARTNER_ACQUIRER_DETAILS, PARTNER_ACQUIRERS_LOADING, PARTNER_ACQUIRERS_FAILURE, PARTNER_ACQUIRERS_SUCCESS } from './actionTypes'


export const createPartnerAcquirerThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    try {

      const res = await myAxios.post(`/api/admin/add_partner_acquirer`, inputData)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertPartnerAcquirersSuccess({create: 'Банк мерчанта добавлен успешно'}))
          return makeRes(true, 'Банк мерчанта добавлен успешно')
        } else {
          dispatch(alertPartnerAcquirersFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertPartnerAcquirersFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 

export const getPartnerAcquirersThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_partners_acquirers`, filterData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(getPartnerAcquirersSuccess( res.data.result['partners_acquirers']))
        return makeRes()
      } else {
        dispatch(alertPartnerAcquirersFailure({ partnerAcquirers: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertPartnerAcquirersFailure({ partnerAcquirers: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const getPartnerAcquirerDetailsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_partners_acquirers_by_uuids`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(setPartnerAcquirerDetails( res.data.result['partners_acquirers'][0]))
        return makeRes()
      } else {
        dispatch(alertPartnerAcquirersFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertPartnerAcquirersFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const updatePartnerAcquirerThunk = (partnerData) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/update_partner_acquirer`, partnerData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertPartnerAcquirersSuccess({update: 'информация о банке мерчанта успешно обновлена'}))
        return makeRes(true, 'информация о банке мерчанта успешно обновлена')
      } else {
        dispatch(alertPartnerAcquirersFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertPartnerAcquirersFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const deletePartnerAcquirersThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/delete_partners_acquirers`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertPartnerAcquirersSuccess({delete: 'Банк мерчанта успешно удалён'}))
        return makeRes(true, 'Банк мерчанта успешно удалён')
      } else {
        dispatch(alertPartnerAcquirersFailure({ delete: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 

    } catch (error) {
      console.log(error);
      dispatch(alertPartnerAcquirersFailure({ delete: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setPartnerAcquirersLoading = (status) => {
  return {
    type: PARTNER_ACQUIRERS_LOADING,
    status
  }
}



export const getPartnerAcquirersSuccess = (partnerAcquirers) => {
  return {
    type: SET_PARTNER_ACQUIRERS,
    partnerAcquirers
  }
}

export const setPartnerAcquirerDetails = (details) => {
  return {
    type: SET_PARTNER_ACQUIRER_DETAILS,
    details
  }
}



export const alertPartnerAcquirersFailure = (errors) => {
  return {
    type: PARTNER_ACQUIRERS_FAILURE,
    errors
  }
}
export const alertPartnerAcquirersSuccess = (message) => {
  return {
    type: PARTNER_ACQUIRERS_SUCCESS,
    message
  }
}


