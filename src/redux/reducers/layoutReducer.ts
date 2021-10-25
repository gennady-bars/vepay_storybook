import { CLOSE_MENU, OPEN_MENU } from "../actions/actionTypes";

const initialState = {
    menuIsOpened: false,
}

type LayoutState = typeof initialState

type LayoutTypes = typeof CLOSE_MENU | typeof  OPEN_MENU

type Layoutction = {
    type: LayoutTypes,
    [key: string]: any
  }
  

export default function layoutReducer(state: LayoutState = initialState, action: Layoutction): LayoutState {
    switch (action.type) {
        case OPEN_MENU:
            return { ...state, menuIsOpened: true }
        case CLOSE_MENU:
            return { ...state, menuIsOpened: false }
        default:
            return state;
    }

}