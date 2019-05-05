import React from 'react'
import PropTypes from 'prop-types'
import { GITHUB_REPO_ISSUES_URL } from 'constants/github-api-routes'
import githubData from 'components/containers/github-data'

const RepositoryIssues = ({ data }) => {
  if (data.isLoading) {
    return <div>Loading</div>
  }

  if (data.error) {
    return <div>Error loading issues</div>
  }

  return (
    <div>
      {data.issues.map((issue) => (
        <div key={issue.id}>
          {issue.title}
        </div>
      ))}
    </div>
  )
}

RepositoryIssues.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    issues: PropTypes.array
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

const withGithubData = githubData(GITHUB_REPO_ISSUES_URL, {
  name: 'issues',
  variables: ({ match }) => ({
    owner: match.params.owner,
    repo: match.params.repo
  })
})

export default withGithubData(RepositoryIssues)
