import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import moment from 'moment'
import { GITHUB_REPO_ISSUES_URL } from 'constants/github-api-routes'
import githubData from 'components/containers/github-data'
import * as fonts from 'styles/fonts'
import media from 'styles/media'
import * as spacing from 'styles/spacing'

const StyledRepositoryIssues = styled.div`
  flex: 1;
  margin-top: ${spacing.COMMON};
  overflow: hidden;
  ${media.mediumScreenUp`
    margin-top: 0;
    padding-left: ${spacing.DOUBLE};
  `}
`

const StyledRepoHeader = styled.div`
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
  margin-bottom: ${spacing.HALF};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 20px;
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
  background: #fff;
    
  &:hover {
    background: #f6f8fa;
  }
`

const StyledIssueDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
  padding-right: ${spacing.HALF};
`

const StyledIssueTitle = styled.div`
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 20px;
`

const StyledAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 2px;
`

const StyledIssueMeta = styled.div`
  color: #586069;
  font-size: 13px;
  line-height: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const getDraggableItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  marginTop: '-1px',
  boxShadow: isDragging ? '1px 1px 10px -3px #ccc' : 'none',
  ...draggableStyle
})

const ISSUES_LIST_DROPPABLE_ID = 'droppable--issues-list'

class RepositoryIssues extends Component {
  handleDragEnd = (result) => {
    const { data, setGithubData } = this.props

    if (!result.destination) { return }

    const issues = Array.from(data.issues)
    const [removed] = issues.splice(result.source.index, 1)
    issues.splice(result.destination.index, 0, removed)

    setGithubData(issues)
  }

  render () {
    const { data, match } = this.props

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

        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId={ISSUES_LIST_DROPPABLE_ID}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.issues.map((issue, index) => (
                  <Draggable key={issue.id} draggableId={issue.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getDraggableItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </StyledRepositoryIssues>
    )
  }
}

RepositoryIssues.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    issues: PropTypes.arrayOf(PropTypes.shape({
      assignee: PropTypes.shape({
        avatar_url: PropTypes.string
      }),
      created_at: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired
    }))
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setGithubData: PropTypes.func.isRequired
}

const withGithubData = githubData(GITHUB_REPO_ISSUES_URL, {
  name: 'issues',
  variables: ({ match }) => ({
    owner: match.params.owner,
    repo: match.params.repo
  })
})

export default withGithubData(RepositoryIssues)
