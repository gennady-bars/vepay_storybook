import {combineReducers} from 'redux'
import layoutReducer from './layoutReducer'
import loginReducer from './loginReducer'
import blogReducer from './blogReducer'
import accountReducer from './accountReducer'
import partnerReducer from './partnerReducer'
import acquirerReducer from './acquirerReducer'
import shopReducer from './shopReducer'
import terminalReducer from './terminalReducer'
import partnerAcquirerReducer from './partnerAcquirersReducer'
import roleReducer from './roleReducer'
import accountRolesReducer from './accountRolesReducer'

export default combineReducers({
    layout: layoutReducer,
    login: loginReducer,
    blog: blogReducer,
    accounts: accountReducer,
    partners: partnerReducer,
    acquirers: acquirerReducer,
    shops: shopReducer,
    terminals: terminalReducer,
    partnerAcquirers: partnerAcquirerReducer,
    roles: roleReducer,
    accountRoles: accountRolesReducer,



})