export interface AppState {
  isLoading: boolean
  isReady: boolean
}

export enum AppActionTypes {
  SET_LOAD = 'SET_LOAD',
  SET_READY = 'SET_READY',
}

interface SetLoadAction {
  type: AppActionTypes.SET_LOAD
}

interface setReadyAction {
  type: AppActionTypes.SET_READY
}

export type AppAction = SetLoadAction | setReadyAction
