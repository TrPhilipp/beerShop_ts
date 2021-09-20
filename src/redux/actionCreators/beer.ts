import { Dispatch } from 'redux'
import { AppActionCreators } from './app'
import BeerApi from './../../API/BeerApi'
import { BeerAction, BeerActionTypes } from '../types/beer'
import { IColumn, IColumns } from '../../types'
import { IBeer } from './../../types/index'

export const BeerActionCreators = {
  getAllBeer: () => async (dispatch: Dispatch) => {
    try {
      dispatch(AppActionCreators.setLoad())
      const response = await BeerApi.getAllBeer()
      dispatch({ type: BeerActionTypes.GET_ALL_BEER, payload: response })
      dispatch(BeerActionCreators.setBeer(20))
      dispatch(AppActionCreators.setLoad())
      dispatch(AppActionCreators.setReady())
    } catch (error) {
      console.log(error)
    }
  },
  setBeer: (count: number): BeerAction => ({
    type: BeerActionTypes.SET_BEER,
    payload: count,
  }),
  reshuffleColumn: (columnName: string, column: IColumn): BeerAction => ({
    type: BeerActionTypes.RESHUFFLE_COLUMN,
    payload: { columnName, column },
  }),
  reshuflleColums: (columns: IColumns): BeerAction => ({
    type: BeerActionTypes.RESHUFFLE_COLUMNS,
    payload: columns,
  }),
  filterBeer: (search: string): BeerAction => ({
    type: BeerActionTypes.FILTER_BEER,
    payload: search,
  }),
  addAll: (): BeerAction => ({ type: BeerActionTypes.ADD_ALL }),
  removeAll: (): BeerAction => ({
    type: BeerActionTypes.REMOVE_ALL,
  }),
  setCurrentBeer: (beer: Array<IBeer>): BeerAction => ({
    type: BeerActionTypes.SET_CURRENT_BEER,
    payload: beer,
  }),
}
