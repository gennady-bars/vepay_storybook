import axios from 'axios'

export const accountAxios = axios.create({
    baseURL: 'https://env-desc-accounts.backend.vepay.cf'
    // baseURL: 'https://vpbc-111-admin.backend.vepay.cf/'
    // baseURL: 'https://vpbc-527-admin.backend.vepay.cf/'
    
})
export const rolesAxios = axios.create({
    baseURL: 'https://env-desc-accounts.backend.vepay.cf'
    // baseURL: 'https://vpbc-111-admin.backend.vepay.cf/'
    // baseURL: 'https://vpbc-527-admin.backend.vepay.cf/'

})

export default axios.create({
    // baseURL: 'http://develop-admin.192-168-110-2.nip.io'
    // baseURL: 'https://vpbc-111-admin.backend.vepay.cf/'
    // baseURL: 'https://vpbc-527-admin.backend.vepay.cf/'

    baseURL: 'https://vpbc-334-integrations.backend.vepay.cf'
})