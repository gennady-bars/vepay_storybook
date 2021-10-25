import { ACQUIRERS_FAILURE, ACQUIRERS_LOADING, ACQUIRERS_SUCCESS, SET_ACQUIRERS, 
  SET_ACQUIRER_DETAILS, 
} from "../actions/actionTypes";


const initialState = {
  acquirers: [],
  loading: false,
  details: {
    uuid: '',
    active: true,
    alias: '',
    name: '',
  },
  errors: {
    acquirers: null,
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
    active: true,
    alias: '',
  }
}

type AcquirerState = typeof initialState

type AcquirerTypes = typeof ACQUIRERS_FAILURE | typeof  ACQUIRERS_LOADING | typeof  ACQUIRERS_SUCCESS | typeof  SET_ACQUIRERS | typeof SET_ACQUIRER_DETAILS 

type AcquirerAction = {
  type: AcquirerTypes,
  [key: string]: any
}

export default function acquirerReducer(state: AcquirerState = initialState, action: AcquirerAction): AcquirerState {
  switch (action.type) {
    case ACQUIRERS_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case ACQUIRERS_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          ...action.message,
        },
      };
    case ACQUIRERS_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors,
        },
      };
    case SET_ACQUIRER_DETAILS:
      return {
        ...state,
        details: action.details,
      };
    case SET_ACQUIRERS:
      return {
        ...state,
        acquirers: action.acquirers,
      };

    default:
      return state;
  }
}
