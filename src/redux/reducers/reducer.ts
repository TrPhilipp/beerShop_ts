import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { beerReducer } from './beerReducer'

export const reducer = combineReducers({
  app: appReducer,
  beer: beerReducer,
})

export type RootState = ReturnType<typeof reducer>
