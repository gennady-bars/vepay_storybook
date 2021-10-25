// @ts-nocheck
import { AppDispatch } from './../store';
import myAxios from '../../configs/modified-axios'

import { mockNews } from '../../utils/mock-news'
import { getAccessToken } from '../../utils/utils'


import { SET_NEWS_FAILURE, GET_NEWS_SUCCESS, NEWS_LOADING,
  GET_NEWS_DETAILS
 } from "./actionTypes"


export const getNewsThunk = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNewsLoading(true))

    try {
      dispatch(setNews(mockNews)) // TEST
      // const data = {
      //   access_token: getAccessToken(),

      // }
      // const res = await myAxios.post(`/api/get_news`, data)
      // if (res.status === 200 && res.data.result) {
        // dispatch(setNewsFailure({ news: null }))
      //   dispatch(setNews(res.data.result.news))
      // } else {
        // dispatch(setNewsFailure({ news: res.data.errors }))
      // } 
    } catch (error) {
      dispatch(setNewsFailure({ news: ['Сервер недоступен'] }))
      console.log(error);
    } finally {
     dispatch(setNewsLoading(false))
    }
  }
}

export const getNewsDetailsThunk = (id) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNewsLoading(true))
    
    try {
      dispatch(setNewsDetails(mockNews.find((news) => news.id === +id)))

      // const data = {
      //   access_token: getAccessToken(),
      //   ids: [id]
      // }
      // const res = await myAxios.post(`/api/get_news_by_ids`, data)
      // if (res.status === 200 && res.data.result) {
          // dispatch(setNewsFailure({ details: null }))
      //   dispatch(setNewsDetails(res.data.result.news[0]))
      // } else {
      //   dispatch(setNewsFailure({ details: res.data.errors }))
      // }
    } catch (error) {
      dispatch(setNewsFailure({ details: ['Сервер недоступен'] }))
      console.log(error);
    } finally {
      dispatch(setNewsLoading(false))
    }
  }
}

export const updateNewsDetailsThunk = (newsData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNewsLoading(true))
    try {
      const data = {
        ...newsData,
        access_token: getAccessToken(),
        // date: new Date(),
        // category_alias: "site"

      }
      const res = await myAxios.post(`/api/update_news`, data)
      if (res.status === 200 && res.data.result) {
        dispatch(setNewsFailure({ update: null }))
        dispatch(setNewsDetails(res.data.result))
      } else {
        dispatch(setNewsFailure({ update: res.data.errors }))
      }
    } catch (error) {
      dispatch(setNewsFailure({ update: ['Сервер недоступен'] }))
      console.log(error);
    } finally {
      dispatch(setNewsLoading(false))
    }
  }
}

export const deleteNewsThunk = (id) => {
  return async (dispatch: AppDispatch) => {

    dispatch(setNewsLoading(true))
    try {
      const data = {
        access_token: getAccessToken(),
        ids: [id]
      }
      const res = await myAxios.post(`/api/delete_news`, data)
      if (res.status === 200 && res.data.result) {
        dispatch(setNewsFailure({ delete: null }))
      } else {
        dispatch(setNewsFailure({ delete: res.data.errors }))
      }
    } catch (error) {
      dispatch(setNewsFailure({ delete: ['Сервер недоступен'] }))
      console.log(error);
    } finally {
      dispatch(setNewsLoading(false))
    }
  }
}

export const createNewsThunk = (newsData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNewsLoading(true))
    try {
      const data = {
        ...newsData,
        access_token: getAccessToken(),
        // date: new Date(),
        // category_alias: "site"
      }
      const res = await myAxios.post(`/api/add_news`, data)
      if (res.status === 200 && res.data.result) {
        dispatch(setNewsFailure({ create: null }))
        dispatch(setNewsDetails(res.data.result))
      } else {
        dispatch(setNewsFailure({ create: res.data.errors }))
      }
    } catch (error) {
      dispatch(setNewsFailure({ create: ['Сервер недоступен'] }))
      console.log(error);
    } finally {
      dispatch(setNewsLoading(false))
    }
  }
}


export const setNewsLoading = (status) => {
  return {
    type: NEWS_LOADING,
    status
  }
}

export const setNewsFailure = (errors) => {
  return {
    type: SET_NEWS_FAILURE,
    errors
  }
}

export const setNews = (news) => {
  return {
    type: GET_NEWS_SUCCESS,
    news
  }
}
export const setNewsDetails = (details) => {
  return {
    type: GET_NEWS_DETAILS,
    details
  }
}