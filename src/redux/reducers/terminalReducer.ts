// @ts-nocheck
import { SET_TERMINALS, SET_TERMINAL_DETAILS, TERMINALS_FAILURE, TERMINALS_LOADING, TERMINALS_SUCCESS } from "../actions/actionTypes";


const initialState = {
  terminals: [],
  loading: false,
  details: {
    uuid: '',
    acquirer_uuid: '',
    name: '',
    config: {},
    currency_num: '',
    config_id: '',
    operations: [],
    store_uuid: ''
  },
  errors: {
    terminals: null,
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
    uuid: '',
  }
}

type TerminalState = typeof initialState

type TerminalTypes = typeof SET_PARTNER_ACQUIRERS | typeof SET_PARTNER_ACQUIRER_DETAILS | typeof  PARTNER_ACQUIRERS_LOADING | typeof  PARTNER_ACQUIRERS_FAILURE | typeof  PARTNER_ACQUIRERS_SUCCESS

type TerminalAction = {
    type: TerminalTypes,
    [key: string]: any
  }
  

export default function terminalReducer(state: TerminalState = initialState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case TERMINALS_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case TERMINALS_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          ...action.message,
        },
      };
    case TERMINALS_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors,
        },
      };
    case SET_TERMINAL_DETAILS:
      return {
        ...state,
        details: action.details,
      };
    case SET_TERMINALS:
      return {
        ...state,
        terminals: action.terminals,
      };

    default:
      return state;
  }
}
