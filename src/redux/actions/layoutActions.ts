// @ts-nocheck
import { CLOSE_MENU, OPEN_MENU } from './actionTypes'

export const openMenu = () => {
    return { type: OPEN_MENU }
}

export const closeMenu = () => {
    return { type: CLOSE_MENU }
}