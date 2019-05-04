import React, { Component } from 'react'
import * as async from 'utils/async'

const withGithubData = (githubApiRoute) => (WrappedComponent) => {
  class GitHubData extends Component {
    state = {
      error: null,
      isLoading: true,
      response: null
    }

    componentDidMount () {
      async.get(githubApiRoute, {
      }).then((response) => {
        this.setState({ isLoading: false, response: response.body })
      }).catch((error) => {
        this.setState({ isLoading: false, error })
      })
    }

    render () {
      const { error, isLoading, response } = this.state

      return (
        <WrappedComponent
          {...this.props}
          data={{ error, isLoading, response }}
        />
      )
    }
  }

  return GitHubData
}

export default withGithubData
