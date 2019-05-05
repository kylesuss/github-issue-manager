import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import * as actions from 'actions/github'
import * as async from 'utils/async'
import { buildRoute } from 'utils/routes'
import { sortAlphabetically } from 'utils/sort'

const buildCacheKey = (name, routeVariables) => {
  const routeVariableValues = Object.values(routeVariables)
  const sortedValues = sortAlphabetically(routeVariableValues)

  if (!sortedValues.length) { return name }

  return `${name}-${sortedValues.join('-')}`
}

const githubData = (githubApiRoute, options = {}) => (WrappedComponent) => {
  class GithubData extends Component {
    constructor (props) {
      super(props)

      const routeVariables = options.variables ? options.variables(props) : {}

      this.state = {
        error: null,
        isLoading: isNil(props.githubData),
        routeVariables,
        cacheKey: buildCacheKey(options.name, routeVariables),
        [options.name]: props.githubData || null
      }
    }

    static getDerivedStateFromProps (props, state) {
      // Handle the initial load of data
      if (props.githubData && !state[options.name]) {
        return {
          isLoading: false,
          [options.name]: props.githubData
        }
      }

      const routeVariables = options.variables ? options.variables(props) : {}
      const cacheKey = buildCacheKey(options.name, routeVariables)
      const isSameKey = state.cacheKey === cacheKey

      // Handle changes in props that may require new data
      if (!isSameKey) {
        const { githubData } = props

        return {
          isLoading: isNil(githubData),
          cacheKey,
          routeVariables,
          [options.name]: githubData
        }
      }

      return null
    }

    componentDidMount () {
      this.fetchData()
    }

    componentDidUpdate () {
      this.fetchData()
    }

    fetchData = () => {
      if (this.state[options.name] || this.state.error) { return }

      async.get(buildRoute(githubApiRoute, this.state.routeVariables), {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }).then((response) => {
        const { setGithubData } = this.props
        const { cacheKey } = this.state
        setGithubData({ [cacheKey]: response.body })
      }).catch((error) => {
        this.setState({ isLoading: false, error })
      })
    }

    render () {
      const { error, isLoading } = this.state

      return (
        <WrappedComponent
          {...this.props}
          data={{ error, isLoading, [options.name]: this.state[options.name] }}
        />
      )
    }
  }

  GithubData.propTypes = {
    githubData: PropTypes.any,
    setGithubData: PropTypes.func.isRequired
  }

  GithubData.defaultProps = {
    githubData: null
  }

  return GithubData
}

const githubDataAndCompositions = (githubApiRoute, options = {}) => (WrappedComponent) => {
  if (!options.name) {
    throw new Error('You need to provide a name to githubData')
  }

  const ComponentWithGithubData = githubData(githubApiRoute, options)(WrappedComponent)

  const mapStateToProps = (state, ownProps) => {
    const routeVariables = options.variables ? options.variables(ownProps) : {}

    return {
      githubData: state.github[buildCacheKey(options.name, routeVariables)]
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    setGithubData: (...args) => dispatch(actions.setGithubData(...args))
  })

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithGithubData)
}

export {
  githubData
}

export default githubDataAndCompositions
