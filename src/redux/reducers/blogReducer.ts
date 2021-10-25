// @ts-nocheck
import { SET_NEWS_FAILURE, GET_NEWS_SUCCESS, NEWS_LOADING,
  GET_NEWS_DETAILS,
} from "../actions/actionTypes";

const initialState = {
  news: [],
  loading: false,
  errors: {
    news: null,
    details: null,
    update: null,
    delete: null,
    create: null,
  },
  details: {},
}

type BlogState = typeof initialState

type BlogTypes = typeof SET_NEWS_FAILURE | typeof  GET_NEWS_SUCCESS | typeof  NEWS_LOADING | typeof  GET_NEWS_DETAILS 

type BlogAction = {
  type: BlogTypes,
  [key: string]: any
}

export default function blogReducer(state: BlogState = initialState, action: BlogAction): BlogState {
  switch (action.type) {
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.news
      }
    case NEWS_LOADING:
      return {
        ...state,
        loading: action.status
      }
    case SET_NEWS_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors
        }
      }
    case GET_NEWS_DETAILS:
        return {
          ...state,
          details: action.details
        }
    default:
      return state;
  }
}