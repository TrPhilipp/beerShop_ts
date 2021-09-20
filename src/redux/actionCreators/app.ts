import { AppAction, AppActionTypes } from '../types/app'

export const AppActionCreators = {
  setLoad: (): AppAction => ({ type: AppActionTypes.SET_LOAD }),
  setReady: (): AppAction => ({ type: AppActionTypes.SET_READY }),
}
