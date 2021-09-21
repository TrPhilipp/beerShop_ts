import React, { ChangeEvent, FC } from 'react'
import { useDispatch } from 'react-redux'
import classes from './Search.module.css'
import { BeerActionCreators } from './../../redux/actionCreators/beer'

const Search: FC = () => {
  const dispatch = useDispatch()

  const searchBeer = (e: ChangeEvent<HTMLInputElement>): void => {
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
