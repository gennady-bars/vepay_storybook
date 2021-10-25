// @ts-nocheck
export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const setAccessToken = (token) => {
  localStorage.setItem('access_token', token)
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}

export const setRefreshToken = (token) => {
  return localStorage.setItem('refresh_token', token)
}

export const setAccessExpiry = (seconds) => {
  localStorage.setItem('access_token_expires_in', Date.now() + Number(seconds) * 1000)
}
export const getAccessExpiry = () => {
   return Number(localStorage.getItem('access_token_expires_in'))
}

export const setRefreshExpiry = (seconds) => {
  localStorage.setItem('refresh_token_expires_in', Date.now() + Number(seconds) * 1000)
}

export const getRefreshExpiry = () => {
  return Number(localStorage.getItem('refresh_token_expires_in'))
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('access_token_expires_in')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('refresh_token_expires_in')
}

export const getTrimmedValues = (values) => {
  const filterData = {}

    Object.keys(values).forEach(key => {
      const data = values[key]
      if (typeof data === 'string') {
        if (data.trim()) {
          filterData[key] = data.trim()
        }
      } else if (typeof data === 'boolean') {
        filterData[key] = data
      } else {
        filterData[key] = data
      }
    })

    if (filterData.limit) {
      filterData.limit = Number(filterData.limit)
    }
    if (filterData.priority_to) {
      filterData.priority_to = Number(filterData.priority_to)
    }
    if (filterData.priority_from) {
        filterData.priority_from = Number(filterData.priority_from)
    }

    return filterData
}

export const checkResponse = (resetForm=(() => {}), message='') => {
  return (res) => {
    if (res === 'success') {
      console.log( `${message} ${res}`)
      resetForm()
    }
  }
} 


export const makeRes = (ok=true, message='Успешно', data={}) => {
  return {
    ok,
    message,
    data
  }
}