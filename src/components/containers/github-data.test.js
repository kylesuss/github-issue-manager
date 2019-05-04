import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import flushPromises from 'test/flush-promises'
import * as async from 'utils/async'
import { withGithubData } from './github-data'

jest.mock('utils/async', () => ({
  get: jest.fn(() => new Promise((resolve) => resolve({ body: ':responseBody' })))
}))

const TEST_URL = ':testUrl'
const WrappedComponent = ({ data }) => (
  <div>
    <span>Error: {data.error || 'none'}</span>
    <span>Response: {data.response || 'none'}</span>
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

const NAME = ':name'
const ComponentWithGithubData = withGithubData(TEST_URL, { name: NAME })(WrappedComponent)

const props = {
  setGithubData: jest.fn()
}

test('it renders the wrapped component before the request is done', async () => {
  const wrapper = mount(<ComponentWithGithubData {...props} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it renders the wrapped component with a response', async () => {
  const mockSetGithubData = jest.fn()
  const wrapper = mount(<ComponentWithGithubData {...props} setGithubData={mockSetGithubData} />)

  await flushPromises()
  
  wrapper.setProps({ githubData: ':responseBody' })
  
  expect(mockSetGithubData).toHaveBeenCalledWith({ [NAME]: ':responseBody' })
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it renders the wrapped component with an error', async () => {
  const mockSetGithubData = jest.fn()
  async.get.mockReturnValueOnce(new Promise((_, reject) => reject(':error')))
  const wrapper = mount(<ComponentWithGithubData {...props} setGithubData={mockSetGithubData} />)

  await flushPromises()
  wrapper.update()

  expect(mockSetGithubData).not.toHaveBeenCalled()
  expect(toJson(wrapper)).toMatchSnapshot()
})
