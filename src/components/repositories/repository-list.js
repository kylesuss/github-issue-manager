import React from 'react'
import PropTypes from 'prop-types'
import withGithubData from 'components/containers/github-data'
import { GITHUB_REPOS_URL } from 'constants/github-api-routes'

const RepositoryList = ({ data }) => {
  if (data.isLoading) {
    return <div>Loading</div>
  }

  if (data.error || !data.response) {
    return <div>Error. Did you setup authentication?</div>
  }

  return (
    <div>
      {data.response.map((repo) => (
        <div key={repo.name}>{repo.name}</div>
      ))}
    </div>
  )
}

RepositoryList.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    response: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }))
  })
}

export {
  RepositoryList
}

export default withGithubData(GITHUB_REPOS_URL)(RepositoryList)
