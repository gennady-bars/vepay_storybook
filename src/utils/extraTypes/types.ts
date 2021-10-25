export interface IRegistrationSliceParams {
  name: string
  email: string
  password: string
}

export interface IRegistrationSliceState {
  registrationRequest: boolean
  registrationSuccess: boolean
  registrationError: boolean
}

export interface IResetPasswordSliceParams {
  token: string
  password: string
}

export interface IResetPasswordSliceState {
  resetPasswordRequest: boolean
  resetPasswordSuccess: boolean
  resetPasswordError: boolean
}


export interface IUserSliceState {
  isLogined: boolean
  loginRequest: boolean
  loginSuccess: boolean
  loginError: boolean
  email: string
  name: string
}

export interface IUpdateUserDataSliceParams {
  name: string
  email: string
  password: string
}

export interface IUpdateUserDataSliceState {
  updateUserDataRequest: boolean
  updateUserDataSuccess: boolean
  updateUserDataError: boolean
}

export interface ILogoutSliceState {
  logoutRequest: boolean
  logoutSuccess: boolean
  logoutError: boolean
}

export interface ILoginSliceParams {
  email: string
  password: string
}

export interface ILoginSliceState {
  loginRequest: boolean
  loginSuccess: boolean
  loginError: boolean
}

export interface IGetUserDataSliceState {
  getUserDataRequest: boolean
  getUserDataSuccess: boolean
  getUserDataError: boolean
}

export interface IForgotPasswordSliceState {
  forgotPasswordRequest: boolean
  forgotPasswordSuccess: boolean
  forgotPasswordError: boolean
}

export interface IForgotPasswordParams {
  email: string
}

export interface IAppSliceState {
  error: string
  loader: Boolean
}

export type SimpleObjectType = {
  [key: string]: string
}


export type ToastTypeType =
  | 'information'
  | 'error';

export type ToastModel = {
  id: string,
  text: string,
  type: ToastTypeType
};


