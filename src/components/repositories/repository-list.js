import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { REPOSITORY_ISSUES_PATH } from 'constants/routes'
import githubData from 'components/containers/github-data'
import { GITHUB_REPOS_URL } from 'constants/github-api-routes'
import { buildRoute } from 'utils/routes'

const StyledRepositoryList = styled.div`
  display: flex;
  flex-direction: column;
`

const RepositoryList = ({ data }) => {
  if (data.isLoading) {
    return <div>Loading</div>
  }

  if (data.error) {
    return <div>Error loading repos</div>
  }

  return (
    <StyledRepositoryList>
      {data.repos.map((repo) => {
        const linkTo = buildRoute(REPOSITORY_ISSUES_PATH, {
          owner: repo.owner.login,
          repo: repo.name
        })

        return (
          <Link to={linkTo} key={repo.name}>
            {repo.name}
          </Link>
        )
      })}
    </StyledRepositoryList>
  )
}

RepositoryList.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        login: PropTypes.string.isRequired
      }).isRequired
    }))
  })
}

const withGithubData = githubData(GITHUB_REPOS_URL, {
  name: 'repos'
})

export {
  RepositoryList
}

export default withGithubData(RepositoryList)
