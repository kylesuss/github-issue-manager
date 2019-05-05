import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { RepositoryList } from './repository-list'

test('it renders loading', () => {
  const wrapper = shallow(<RepositoryList data={{ isLoading: true }} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it renders with an error', () => {
  const data = { isLoading: false, error: 'You broke it' }
  const wrapper = shallow(<RepositoryList data={data} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it renders with data', () => {
  const data = {
    isLoading: false,
    repos: [{
      name: ':repoName1',
      owner: { login: ':login1' }
    }, {
      name: ':repoName2',
      owner: { login: ':login2' }
    }]
  }
  const wrapper = shallow(<RepositoryList data={data} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
