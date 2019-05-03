import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { REPOSITORIES_PATH, REPOSITORY_PATH } from 'constants/routes'
import RepositoryList from './repository-list'
import Repository from './repository'

const Repositories = () => (
  <div>
    <RepositoryList />

    <Switch>
      <Route path={REPOSITORIES_PATH} exact />
      <Route path={REPOSITORY_PATH} exact component={Repository} />
      <Redirect to={REPOSITORIES_PATH} />
    </Switch>
  </div>
)

export default Repositories
