import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import Repositories from 'components/repositories'
import { REPOSITORIES_PATH } from 'constants/routes'
import store from 'store'
import 'styles/global'

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={REPOSITORIES_PATH} component={Repositories} />
        <Redirect to={REPOSITORIES_PATH} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Root
