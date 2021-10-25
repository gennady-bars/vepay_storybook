import { ACCOUNT_ROLES_LOADING, SET_ACCOUNT_ROLES_DETAILS, ACCOUNT_ROLES_FAILURE, SET_ACCOUNT_ROLES, ACCOUNT_ROLES_SUCCESS } from "../actions/actionTypes";

const initialState = {
  accountRoles: [],
  loading: false,
  details: {
    uuid: '',
  },
  errors: {
    accountRoles: null,
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

type AccountRolesState = typeof initialState

type AccountRolesTypes = typeof ACCOUNT_ROLES_LOADING | typeof SET_ACCOUNT_ROLES_DETAILS | typeof  ACCOUNT_ROLES_FAILURE | typeof SET_ACCOUNT_ROLES | typeof ACCOUNT_ROLES_SUCCESS

type AccountRolesAction = {
  type: AccountRolesTypes,
  [key: string]: any
}

export default function accountRolesReducer(state: AccountRolesState = initialState, action: AccountRolesAction): AccountRolesState {
  switch (action.type) {
    case ACCOUNT_ROLES_LOADING:
      return {
        ...state,
        loading: action.status
      }

    case SET_ACCOUNT_ROLES:
      return {
        ...state,
        accountRoles: action.accountRoles
      }

    case SET_ACCOUNT_ROLES_DETAILS:
      return {
        ...state,
        details: action.details
      }

    case ACCOUNT_ROLES_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors
        }
      }

    case ACCOUNT_ROLES_SUCCESS:
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