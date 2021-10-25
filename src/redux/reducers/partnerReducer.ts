import { SET_PARTNERS, SET_PARTNER_DETAILS, PARTNERS_LOADING, PARTNERS_FAILURE, PARTNERS_SUCCESS } from "../actions/actionTypes";

const initialState = {
  partners: [],
  loading: false,
  details: {
    uuid: '',
    inn: '',
    name: ''
  },
  errors: {
    partners: null,
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
    inn: '',
    limit: 100,
    name: '',
    offset: 0,
    sort_by: [],
    uuid: ''
  }
}

type PartnerState = typeof initialState

type PartnerTypes = typeof SET_PARTNERS | typeof SET_PARTNER_DETAILS | typeof  PARTNERS_LOADING | typeof  PARTNERS_FAILURE | typeof  PARTNERS_SUCCESS

type PartnerAction = {
    type: PartnerTypes,
    [key: string]: any
  }
  

export default function partnerReducer(state: PartnerState = initialState, action: PartnerAction): PartnerState {
  switch (action.type) {

    case PARTNERS_LOADING:
      return {
        ...state,
        loading: action.status
      }

    case SET_PARTNERS:
      return {
        ...state,
        partners: action.partners
      }

    case SET_PARTNER_DETAILS:
      return {
        ...state,
        details: action.details
      }
  
      case PARTNERS_FAILURE:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.errors
          }
        }

      case PARTNERS_SUCCESS:
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