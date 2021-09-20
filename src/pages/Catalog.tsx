import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from './../hooks/UseTypedSelector'
import Loader from './../components/Loader/Loader'
import classes from '../App.module.css'
import Search from './../components/Search/Search'
import BeerCatalog from './../components/BeerCatalog/BeerCatalog'
import { BeerActionCreators } from './../redux/actionCreators/beer'

const Catalog: FC = () => {
  const { isLoading, isReady } = useTypedSelector((state) => state.app)
  const dispatch = useDispatch()

  const loadBeer = () => {
    dispatch(BeerActionCreators.getAllBeer())
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="content">
      {!isReady ? (
        <button className={classes.content__btn} onClick={() => loadBeer()}>
          Load catalog
        </button>
      ) : (
        <>
          <div className={classes.search__wrapper}>
            <Search />
          </div>
          <BeerCatalog />
        </>
      )}
    </div>
  )
}

export default Catalog
