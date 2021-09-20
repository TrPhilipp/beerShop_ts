import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/consts'
import classes from './Nav.module.css'

const Nav: FC = () => {
  return (
    <div className={classes.nav}>
      <Link className={classes.nav__link} to={ROUTES.HOME}>
        Home
      </Link>
      <Link className={classes.nav__link} to={ROUTES.CATALOG}>
        Catalog
      </Link>
      <Link className={classes.nav__link} to={ROUTES.ABOUT}>
        About
      </Link>
    </div>
  )
}

export default Nav
