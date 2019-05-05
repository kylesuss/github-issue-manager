import React from 'react'
import styled from 'styled-components'
import { Switch, Redirect, Route } from 'react-router-dom'
import { REPOSITORIES_PATH, REPOSITORY_ISSUES_PATH } from 'constants/routes'
import * as spacing from 'styles/spacing'
import RepositoryList from './repository-list'
import RepositoryIssues from './repository-issues'

const StyledRepositories = styled.div`
  display: flex;
  padding: ${spacing.COMMON};
`

const Repositories = () => (
  <StyledRepositories>
    <RepositoryList />

    <Switch>
      <Route path={REPOSITORIES_PATH} exact />
      <Route path={REPOSITORY_ISSUES_PATH} exact component={RepositoryIssues} />
      <Redirect to={REPOSITORIES_PATH} />
    </Switch>
  </StyledRepositories>
)

export default Repositories
