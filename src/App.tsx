import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Home from './pages/Home'
import { ROUTES } from './utils/consts'
import Header from './components/Header/Header'
import classes from './App.module.css'

// interface IRoute {
//   path: string
//   component: React.ComponentType
//   exact: boolean
// }

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className={classes.App}>
        <Switch>
          <Route path={ROUTES.CATALOG} component={Catalog} exact />
          <Route path={ROUTES.ABOUT} component={About} exact />
          <Route path={ROUTES.HOME} component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
