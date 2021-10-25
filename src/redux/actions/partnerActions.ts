// @ts-nocheck
import { AppDispatch } from './../store';
import myAxios from '../../configs/modified-axios'
import { makeRes } from '../../utils/utils'
import { SET_PARTNERS, SET_PARTNER_DETAILS, PARTNERS_LOADING, PARTNERS_FAILURE, PARTNERS_SUCCESS } from './actionTypes'


export const createPartnerThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    try {

      const res = await myAxios.post(`/api/admin/add_partner`, inputData)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertPartnersSuccess({create: 'Партрнёр добавлен успешно'}))
          return makeRes(true, 'Партрнёр добавлен успешно', res.data.result)
        } else {
          dispatch(alertPartnersFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertPartnersFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 



export const getPartnersThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_partners`, filterData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(getPartnersSuccess( res.data.result.partners))
        return makeRes()
      } else {
        dispatch(alertPartnersFailure({ partners: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertPartnersFailure({ partners: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const getPartnerDetailsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_partners_by_uuids`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(setPartnerDetails( res.data.result.partners[0]))
        return makeRes()
      } else {
        dispatch(alertPartnersFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertPartnersFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const updatePartnerThunk = (partnerData) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/update_partner`, partnerData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertPartnersSuccess({update: 'информация о мерчанте успешно обновлена'}))
        return makeRes(true, 'информация о мерчанте успешно обновлена', res.data.result)
      } else {
        dispatch(alertPartnersFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertPartnersFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const deletePartnersThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/delete_partners`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertPartnersSuccess({delete: 'мерчант успешно удалён'}))
        return makeRes(true, 'мерчант успешно удалён')
      } else {
        dispatch(alertPartnersFailure({ delete: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 

    } catch (error) {
      console.log(error);
      dispatch(alertPartnersFailure({ delete: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setPartnersLoading = (status) => {
  return {
    type: PARTNERS_LOADING,
    status
  }
}



export const getPartnersSuccess = (partners) => {
  return {
    type: SET_PARTNERS,
    partners
  }
}

export const setPartnerDetails = (details) => {
  return {
    type: SET_PARTNER_DETAILS,
    details
  }
}



export const alertPartnersFailure = (errors) => {
  return {
    type: PARTNERS_FAILURE,
    errors
  }
}
export const alertPartnersSuccess = (message) => {
  return {
    type: PARTNERS_SUCCESS,
    message
  }
}


