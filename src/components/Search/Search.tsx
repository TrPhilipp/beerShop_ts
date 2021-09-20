import React, { ChangeEvent, FC } from 'react'
import { useDispatch } from 'react-redux'
import classes from './Search.module.css'
import { BeerActionCreators } from './../../redux/actionCreators/beer'
import { useTypedSelector } from './../../hooks/UseTypedSelector'

const Search: FC = () => {
  const { beer } = useTypedSelector((state) => state.beer.columns)
  const dispatch = useDispatch()
  console.log(beer)

  const searchBeer = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!beer.items.length) return
    const search = e.target.value
    dispatch(BeerActionCreators.filterBeer(search))
  }
  return (
    <>
      <input
        className={classes.search}
        placeholder="Search"
        onChange={searchBeer}
      />
    </>
  )
}

export default Search
