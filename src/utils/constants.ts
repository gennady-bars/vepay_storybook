// @ts-nocheck
export const operationsOptions = [
  {name: 'payin e-com', value: 'ecom', jsonKey: 'operations'},
  {name: 'payout (oct)', value: 'oct_card', jsonKey: 'operations'},
  {name: 'payin AFT', value: 'aft', jsonKey: 'operations'},
  {name: 'payout (ПСР)', value: 'oct_account', jsonKey: 'operations'},
  {name: 'card registration', value: 'ecom_recurring_reg', jsonKey: 'operations'},
  {name: 'recurrent e-com', value: 'ecom_recurring', jsonKey: 'operations'},
  {name: 'recurrent AFT', value: 'aft_recurring', jsonKey: 'operations'},
  {name: 'recurrent e-com (splitted)', value: 'ecom_recurring_splitted', jsonKey: 'operations'},
  {name: 'recurrent AFT (splitted)', value: 'aft_recurring_splitted', jsonKey: 'operations'},
  {name: 'payin e-com (splitted)', value: 'ecom_splitted', jsonKey: 'operations'},
  {name: 'payin AFT (splitted)', value: 'aft_splitted', jsonKey: 'operations'},
  {name: 'УПРИД', value: 'uprid', jsonKey: 'operations'},
]


export const activeOptions = [
  {name: 'Да', value: false, jsonKey: 'blocked'},
  {name: 'Нет', value: true, jsonKey: 'blocked'},
]


export const currencyOptions = [
  {"value": "643", "code": "RUB", "name": "Российский рубль", jsonKey: 'currency_num'},
  {"value": "840", "code": "USD", "name": "Доллар США", jsonKey: 'currency_num'},
  {"value": "978", "code": "EUR", "name": "Евро", jsonKey: 'currency_num'},
  {"value": "392", "code": "JPY", "name": "Японская йена", jsonKey: 'currency_num'},
  {"value": "156", "code": "CNY", "name": "Китайский юань женьминьби", jsonKey: 'currency_num'},
]

export const cardBrandsOptions = [
  {name: 'VISA', value: 'visa', jsonKey: 'card_brands'},
  {name: 'Master card', value: 'mc', jsonKey: 'card_brands'},
  {name: 'JCB', value: 'jcb', jsonKey: 'card_brands'},
  {name: 'AMEX', value: 'amex', jsonKey: 'card_brands'},
  {name: 'Discover', value: 'discover', jsonKey: 'card_brands'},
  {name: 'MIR', value: 'mir', jsonKey: 'card_brands'},
]
