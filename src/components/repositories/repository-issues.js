import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { GITHUB_REPO_ISSUES_URL } from 'constants/github-api-routes'
import githubData from 'components/containers/github-data'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'

const StyledRepositoryIssues = styled.div`
  flex: 1;
  padding-left: ${spacing.DOUBLE};
`

const StyledRepoHeader = styled.div`
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
  margin-bottom: ${spacing.HALF};
`

const StyledEmptyState = styled.div`
  border-radius: 3px;
  background: #fafbfc;
  border: 1px solid #d1d5da;
  box-shadow: inset 0 0 10px rgba(27, 31, 35, .05);
  padding: ${spacing.DOUBLE};
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
`

const StyledIssue = styled.div`
  padding: ${spacing.HALF};
  display: flex;
  justify-content: space-between;
  border: 1px solid #e1e4e8;
  box-sizing: border-box;
  height: 66px;
  
  &:nth-of-type(n + 2) {
    margin-top: -1px;
  }
  
  &:hover {
    background: #f6f8fa;
  }
`

const StyledIssueDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledIssueTitle = styled.div`
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
`

const StyledAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 2px;
`

const StyledIssueMeta = styled.div`
  color: #586069;
  font-size: 13px;
`

const RepositoryIssues = ({ data, match }) => {
  if (data.isLoading) {
    return <StyledRepositoryIssues>Loading</StyledRepositoryIssues>
  }

  if (data.error) {
    return <StyledRepositoryIssues>Error loading issues</StyledRepositoryIssues>
  }

  if (data.issues.length < 1) {
    return (
      <StyledRepositoryIssues>
        <StyledRepoHeader>
          {match.params.repo}
        </StyledRepoHeader>

        <StyledEmptyState>
          No issues!
        </StyledEmptyState>
      </StyledRepositoryIssues>
    )
  }

  return (
    <StyledRepositoryIssues>
      <StyledRepoHeader>
        {match.params.repo}
      </StyledRepoHeader>

      {data.issues.map((issue) => (
        <StyledIssue key={issue.id}>
          <StyledIssueDetails>
            <StyledIssueTitle>
              {issue.title}
            </StyledIssueTitle>

            <StyledIssueMeta>
              #{issue.number} opened on {moment(issue.created_at).format('MM/DD/YYYY')}, updated {moment(issue.updated_at).fromNow()}
            </StyledIssueMeta>
          </StyledIssueDetails>

          {issue.assignee && (
            <StyledAvatar src={issue.assignee.avatar_url} />
          )}
        </StyledIssue>
      ))}
    </StyledRepositoryIssues>
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
