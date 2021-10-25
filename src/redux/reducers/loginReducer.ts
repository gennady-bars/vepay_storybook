import { LOG_OUT, SET_IS_ADMIN, SET_IS_LOGGED_IN, SET_LOGIN_ERRORS, SET_LOGIN_LOADING } from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  errors: null,
  loading: false,
  user: 'customer',
  authData: null,
  isAdmin: false
}


type LoginState = typeof initialState

type LoginTypes = typeof LOG_OUT | typeof SET_IS_ADMIN | typeof  SET_IS_LOGGED_IN | typeof  SET_LOGIN_ERRORS | typeof  SET_LOGIN_LOADING

type LoginAction = {
    type: LoginTypes,
    [key: string]: any
  }
  

export default function loginReducer(state: LoginState = initialState, action: LoginAction): LoginState {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state, 
        isLoggedIn: action.status,
        authData: action.authData
      }
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin,
        user: 'admin',
      }
    case SET_LOGIN_ERRORS:
      return {
        ...state,
        errors: action.errors
      }
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loading: action.status,
      }
    case LOG_OUT:
      return initialState
    default:
      return state;
  }
}