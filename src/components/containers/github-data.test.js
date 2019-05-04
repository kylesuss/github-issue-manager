import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import flushPromises from 'test/flush-promises'
import * as async from 'utils/async'
import withGithubData from './github-data'

jest.mock('utils/async', () => ({
  get: jest.fn(() => new Promise((resolve) => resolve({ body: ':responseBody' })))
}))

const TEST_URL = ':testUrl'
const WrappedComponent = ({ data }) => (
  <div>
    <span>Error: {data.error}</span>
    <span>Response: {data.response}</span>
    <span>Loading: {data.isLoading.toString()}</span>
  </div>
)

WrappedComponent.propTypes = {
  data: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    response: PropTypes.string
  }),
  error: PropTypes.string,
  response: PropTypes.string,
}

test('it renders the wrapped component before the request is done', async () => {
  const ComponentWithGithubData = withGithubData(TEST_URL)(WrappedComponent)
  const wrapper = mount(<ComponentWithGithubData />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it renders the wrapped component with a response', async () => {
  const ComponentWithGithubData = withGithubData(TEST_URL)(WrappedComponent)
  const wrapper = mount(<ComponentWithGithubData />)

  await flushPromises()
  wrapper.update()

  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it renders the wrapped component with an error', async () => {
  async.get.mockReturnValueOnce(new Promise((_, reject) => reject(':error')))
  const ComponentWithGithubData = withGithubData(TEST_URL)(WrappedComponent)
  const wrapper = mount(<ComponentWithGithubData />)

  await flushPromises()
  wrapper.update()

  expect(toJson(wrapper)).toMatchSnapshot()
})
