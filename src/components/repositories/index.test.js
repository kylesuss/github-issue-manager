import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Repositories from './index'

test('it renders', () => {
  const wrapper = shallow(<Repositories />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
