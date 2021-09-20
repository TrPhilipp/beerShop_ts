import { AppState, AppActionTypes, AppAction } from './../types/app'

const initialState: AppState = {
  isLoading: false,
  isReady: false,
}

export const appReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_LOAD:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case AppActionTypes.SET_READY:
      return {
        ...state,
        isReady: true,
      }
    default:
      return state
  }
}
