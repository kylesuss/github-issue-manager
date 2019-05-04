import * as actions from 'actions/github'

const initialState = {}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_GITHUB_DATA:
      return {
        ...state,
        ...action.data
      }
    default:
      return { ...state }
  }
}
