import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import * as actions from 'actions/github'
import * as async from 'utils/async'

const withGithubData = (githubApiRoute, options = {}) => (WrappedComponent) => {
  class GithubData extends Component {
    constructor (props) {
      super(props)

      this.state = {
        error: null,
        isLoading: isNil(props.githubData),
        response: props.githubData || null
      }
    }

    static getDerivedStateFromProps (props, state) {
      if (props.githubData && !state.response) {
        return {
          isLoading: false,
          response: props.githubData
        }
      }

      return null
    }

    componentDidMount () {
      const { response } = this.state

      if (response) { return }

      async.get(githubApiRoute, {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }).then((response) => {
        const { setGithubData } = this.props
        setGithubData({ [options.name]: response.body })
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

  GithubData.propTypes = {
    githubData: PropTypes.any,
    setGithubData: PropTypes.func.isRequired
  }

  return GithubData
}

const withGithubDataAndCompositions = (githubApiRoute, options = {}) => (WrappedComponent) => {
  if (!options.name) {
    throw new Error('You need to provide a name to withGithubData')
  }

  const ComponentWithGithubData = withGithubData(githubApiRoute, options)(WrappedComponent)

  const mapStateToProps = (state) => ({
    githubData: state.github[options.name]
  })

  const mapDispatchToProps = (dispatch) => ({
    setGithubData: (...args) => dispatch(actions.setGithubData(...args))
  })

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithGithubData)
}

export {
  withGithubData
}

export default withGithubDataAndCompositions
