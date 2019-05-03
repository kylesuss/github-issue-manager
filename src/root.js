import React from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from 'store'
import { ROOT_PATH } from 'constants/routes'
import 'styles/global'

const StyledApp = styled.div`position: relative;`
const App = () => <StyledApp>Sup, you reading my old commits?</StyledApp>

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={ROOT_PATH} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Root
