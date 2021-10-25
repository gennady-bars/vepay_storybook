// @ts-nocheck
import { AppDispatch } from './../store';
import myAxios from '../../configs/modified-axios'
import { makeRes } from '../../utils/utils';
import { SHOPS_FAILURE, SHOPS_LOADING, SHOPS_SUCCESS, SET_SHOPS, SET_SHOP_DETAILS } from './actionTypes';


export const createShopThunk = (inputData) => {
  return async (dispatch: AppDispatch) => {

    try {

      const res = await myAxios.post(`/api/admin/add_store`, inputData)

      console.log(res);
      
      if (res.status === 200 && res.data.result) {
          dispatch(alertShopsSuccess({create: 'Магазин добавлен успешно'}))
          return makeRes(true, 'Магазин добавлен успешно')
        } else {
          dispatch(alertShopsFailure({ create: res.data.errors }))
          return makeRes(false, res.data.errors)
        } 
    } catch (error) {
      console.log(error.message);
      dispatch(alertShopsFailure({create: [error.message]}))
      return makeRes(false, [error.message])
    }
  }
} 

export const getShopsThunk = (filterData={}) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_stores`, filterData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(getShopsSuccess( res.data.result.stores))
        return makeRes()
      } else {
        dispatch(alertShopsFailure({ stores: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertShopsFailure({ stores: [error.message] }))
      return makeRes(false, [error.message])
    
    }
  }
}

export const getShopDetailsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/get_stores_by_uuids`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(setShopDetails( res.data.result.stores[0]))
        return makeRes()
      } else {
        dispatch(alertShopsFailure({ details: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertShopsFailure({ details: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}

export const updateShopThunk = (shopData) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/update_store`, shopData)
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertShopsSuccess({update: 'информация о магазине успешно обновлена'}))
        return makeRes(true, 'информация о магазине успешно обновлена', res.data.result)
      } else {
        dispatch(alertShopsFailure({ update: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 
    } catch (error) {
      console.log(error);
      dispatch(alertShopsFailure({ update: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const deleteShopsThunk = (uuids) => {
  return async (dispatch: AppDispatch) => {

    try {
      const res = await myAxios.post(`/api/admin/delete_stores`, {uuids})
      console.log(res);

      if (res.status === 200 && res.data.result) {
        dispatch(alertShopsSuccess({delete: 'Магазин успешно удалён'}))
        return makeRes(true, 'Магазин успешно удалён')
      } else {
        dispatch(alertShopsFailure({ delete: res.data.errors }))
        return makeRes(false, res.data.errors)
      } 

    } catch (error) {
      console.log(error);
      dispatch(alertShopsFailure({ delete: [error.message] }))
      return makeRes(false, [error.message])
    }
  }
}


export const setShopsLoading = (status) => {
  return {
    type: SHOPS_LOADING,
    status
  }
}



export const getShopsSuccess = (shops) => {
  return {
    type: SET_SHOPS,
    shops
  }
}

export const setShopDetails = (details) => {
  return {
    type: SET_SHOP_DETAILS,
    details
  }
}



export const alertShopsFailure = (errors) => {
  return {
    type: SHOPS_FAILURE,
    errors
  }
}
export const alertShopsSuccess = (message) => {
  return {
    type: SHOPS_SUCCESS,
    message
  }
}


