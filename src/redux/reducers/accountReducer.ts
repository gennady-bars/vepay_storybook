import { ACCOUNTS_LOADING, SET_ACCOUNTS_DETAILS, ACCOUNTS_FAILURE, SET_ACCOUNTS, ACCOUNTS_SUCCESS } from "../actions/actionTypes";

const initialState = {
  accounts: [],
  loading: false,
  details: {
    uuid: '',
  },
  errors: {
    accounts: null,
    details: null,
    update: null,
    delete: null,
    create: null,
  },
  success: {
    update: null,
    delete: null,
    create: null,
  },
  filter: {
    limit: 100,
    name: '',
    offset: 0,
    sort_by: [],
    uuid: ''
  }
}

type AccountState = typeof initialState

type AccountTypes = typeof ACCOUNTS_LOADING | typeof  SET_ACCOUNTS_DETAILS | typeof  ACCOUNTS_FAILURE | typeof  SET_ACCOUNTS | typeof  ACCOUNTS_SUCCESS

type AccountAction = {
  type: AccountTypes,
  [key: string]: any
}

export default function accountReducer(state: AccountState = initialState, action: AccountAction): AccountState {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return {
        ...state,
        loading: action.status
      }

    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      }

    case SET_ACCOUNTS_DETAILS:
      return {
        ...state,
        details: action.details
      }

    case ACCOUNTS_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors
        }
      }

    case ACCOUNTS_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          ...action.message
        }
      }

    default:
      return state;
  }
}