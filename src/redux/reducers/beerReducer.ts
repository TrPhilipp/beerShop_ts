import { IBeer } from '../../types'
import { BeerState, BeerActionTypes, BeerAction } from './../types/beer'

const initialState: BeerState = {
  columns: {
    beer: { name: 'beer', items: [] },
    basket: { name: 'basket', items: [] },
  },
  allBeer: [],
  currentBeer: [],
}

export const beerReducer = (
  state = initialState,
  action: BeerAction
): BeerState => {
  switch (action.type) {
    case BeerActionTypes.GET_ALL_BEER:
      return {
        ...state,
        allBeer: [...action.payload],
      }
    case BeerActionTypes.SET_BEER: {
      const newBeer = state.allBeer.splice(0, action.payload)
      return {
        ...state,
        columns: {
          ...state.columns,
          beer: {
            ...state.columns.beer,
            items: [...state.columns.beer.items, ...newBeer],
          },
        },
        currentBeer: [...state.currentBeer, ...newBeer],
      }
    }
    case BeerActionTypes.RESHUFFLE_COLUMN:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.columnName]: {
            ...action.payload.column,
          },
        },
      }
    case BeerActionTypes.RESHUFFLE_COLUMNS:
      return {
        ...state,
        columns: {
          ...action.payload,
        },
      }
    case BeerActionTypes.ADD_ALL:
      return {
        ...state,
        columns: {
          beer: { ...state.columns.beer, items: [] },
          basket: {
            ...state.columns.basket,
            items: [...state.columns.basket.items, ...state.columns.beer.items],
          },
        },
      }
    case BeerActionTypes.REMOVE_ALL:
      return {
        ...state,
        columns: {
          beer: {
            ...state.columns.beer,
            items: [...state.columns.beer.items, ...state.columns.basket.items],
          },
          basket: { ...state.columns.basket, items: [] },
        },
      }
    case BeerActionTypes.FILTER_BEER:
      return {
        ...state,
        columns: {
          ...state.columns,
          beer: {
            ...state.columns.beer,
            items: state.currentBeer.filter((beer) =>
              filterItems(beer, action.payload)
            ),
          },
        },
      }
    case BeerActionTypes.SET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: [...action.payload],
      }
    default:
      return state
  }
}

function filterItems(item: IBeer, searchQuery: string) {
  return item.name.toLowerCase().includes(searchQuery.toLowerCase())
}
