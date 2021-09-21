import { IBeer } from '../../types'
import { BeerState, BeerActionTypes, BeerAction } from './../types/beer'

const initialState: BeerState = {
  columns: {
    beer: { name: 'beer', items: [] },
    basket: { name: 'basket', items: [] },
  },
  allBeer: [],
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
            items: action.payload
              ? filterBeer(
                  action.payload,
                  state.allBeer,
                  state.columns.basket.items
                )
              : returnBeer(state.allBeer, state.columns.basket.items),
          },
        },
      }
    case BeerActionTypes.ADD_BEER: {
      let initialNumber: number =
        state.columns.beer.items.length + state.columns.basket.items.length
      if (initialNumber === 80) {
        return state
      }
      const newArray = [
        ...state.allBeer.slice(initialNumber, initialNumber + action.payload),
      ]
      return {
        ...state,
        columns: {
          ...state.columns,
          beer: {
            ...state.columns.beer,
            items: [...state.columns.beer.items, ...newArray],
          },
        },
      }
    }
    default:
      return state
  }
}

function filterBeer(
  searchQ: string,
  allBeer: Array<IBeer>,
  array2: Array<IBeer>
): Array<IBeer> {
  return allBeer.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQ.toLowerCase()) &&
      !array2.some((i) => i.id === item.id)
    )
  })
}

function returnBeer(allBeer: Array<IBeer>, array2: Array<IBeer>) {
  return allBeer.filter((item) => {
    return item.id < 21 && !array2.some((i) => i.id === item.id)
  })
}
