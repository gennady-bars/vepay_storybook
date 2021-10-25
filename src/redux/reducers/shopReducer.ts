// @ts-nocheck
import { SET_SHOPS, SET_SHOP_DETAILS, SHOPS_FAILURE, SHOPS_LOADING, SHOPS_SUCCESS } from "../actions/actionTypes";


const initialState = {
  shops: [],
  loading: false,
  details: {
    uuid: '',
    partner_uuid: '',
    name: '',
  },
  errors: {
    shops: null,
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
    partner_uuid: '',
  }
}

type ShopState = typeof initialState

type ShopTypes = typeof SET_SHOPS | typeof SET_SHOP_DETAILS | typeof  SHOPS_FAILURE | typeof  SHOPS_LOADING | typeof  SHOPS_SUCCESS

type ShopAction = {
    type: ShopTypes,
    [key: string]: any
  }
  

export default function shopReducer(state: ShopState = initialState, action: ShopAction): ShopState {
  switch (action.type) {
    case SHOPS_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case SHOPS_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          ...action.message,
        },
      };
    case SHOPS_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors,
        },
      };
    case SET_SHOP_DETAILS:
      return {
        ...state,
        details: action.details,
      };
    case SET_SHOPS:
      return {
        ...state,
        shops: action.shops,
      };

    default:
      return state;
  }
}
