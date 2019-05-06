import React from 'react'
import styled from 'styled-components'
import { Switch, Redirect, Route } from 'react-router-dom'
import { REPOSITORIES_PATH, REPOSITORY_ISSUES_PATH } from 'constants/routes'
import media from 'styles/media'
import * as spacing from 'styles/spacing'
import RepositoryList from './repository-list'
import RepositoryIssues from './repository-issues'

const StyledRepositories = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.COMMON};
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  ${media.mediumScreenUp`
    flex-direction: row;
  `}
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
