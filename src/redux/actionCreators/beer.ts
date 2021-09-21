import { Dispatch } from 'redux'
import { AppActionCreators } from './app'
import BeerApi from './../../API/BeerApi'
import { BeerAction, BeerActionTypes } from '../types/beer'
import { IColumn, IColumns } from '../../types'

export const BeerActionCreators = {
  getAllBeer: () => async (dispatch: Dispatch) => {
    try {
      dispatch(AppActionCreators.setLoad())
      const response = await BeerApi.getAllBeer()
      dispatch({ type: BeerActionTypes.GET_ALL_BEER, payload: response })
      dispatch(BeerActionCreators.addBeer(20))
      dispatch(AppActionCreators.setLoad())
      dispatch(AppActionCreators.setReady())
    } catch (error) {
      console.log(error)
    }
  },
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

  addBeer: (count: number): BeerAction => ({
    type: BeerActionTypes.ADD_BEER,
    payload: count,
  }),
}
