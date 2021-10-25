import { SET_PARTNER_ACQUIRERS, SET_PARTNER_ACQUIRER_DETAILS, PARTNER_ACQUIRERS_LOADING, PARTNER_ACQUIRERS_FAILURE, PARTNER_ACQUIRERS_SUCCESS } from "../actions/actionTypes";

const initialState = {
  partnerAcquirers: [],
  loading: false,
  details: {
    uuid: '',
    acquirer_uuid: '',
    active: '',
    card_brands: [],
    partner_uuid: '',
    priority: '',
  },
  errors: {
    partnerAcquirers: null,
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
    offset: 0,
    sort_by: [],
    uuid: ''
  }
}

type PartnerAcquirerState = typeof initialState

type PartnerAcquirerTypes = typeof SET_PARTNER_ACQUIRERS | typeof SET_PARTNER_ACQUIRER_DETAILS | typeof  PARTNER_ACQUIRERS_LOADING | typeof  PARTNER_ACQUIRERS_FAILURE | typeof  PARTNER_ACQUIRERS_SUCCESS

type PartnerAcquirerAction = {
    type: PartnerAcquirerTypes,
    [key: string]: any
  }
  

export default function partnerAcquirerReducer(state: PartnerAcquirerState = initialState, action: PartnerAcquirerAction): PartnerAcquirerState {
  switch (action.type) {

    case PARTNER_ACQUIRERS_LOADING:
      return {
        ...state,
        loading: action.status
      }

    case SET_PARTNER_ACQUIRERS:
      return {
        ...state,
        partnerAcquirers: action.partnerAcquirers
      }

    case SET_PARTNER_ACQUIRER_DETAILS:
      return {
        ...state,
        details: action.details
      }
  
      case PARTNER_ACQUIRERS_FAILURE:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.errors
          }
        }

      case PARTNER_ACQUIRERS_SUCCESS:
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