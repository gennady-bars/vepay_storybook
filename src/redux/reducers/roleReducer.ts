// @ts-nocheck
import { ROLES_LOADING, SET_ROLES_DETAILS, ROLES_FAILURE, SET_ROLES, ROLES_SUCCESS } from "../actions/actionTypes";

const initialState = {
  roles: [],
  loading: false,
  details: {
    uuid: '',
  },
  errors: {
    roles: null,
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

type RoleState = typeof initialState

type RoleTypes = typeof ROLES_LOADING | typeof SET_ROLES_DETAILS | typeof  ROLES_FAILURE | typeof  SET_ROLES | typeof  ROLES_SUCCESS

type RoleAction = {
    type: RoleTypes,
    [key: string]: any
  }
  

export default function roleReducer(state: RoleState = initialState, action: RoleAction): RoleState {
  switch (action.type) {
    case ROLES_LOADING:
      return {
        ...state,
        loading: action.status
      }

    case SET_ROLES:
      return {
        ...state,
        roles: action.roles
      }

    case SET_ROLES_DETAILS:
      return {
        ...state,
        details: action.details
      }

    case ROLES_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors
        }
      }

    case ROLES_SUCCESS:
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