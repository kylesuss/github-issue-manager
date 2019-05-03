import { combineReducers } from 'redux'

export default combineReducers({
  app: (state = {}, action = {}) => {
    switch (action.type) {
      default:
        return state
    }
  }
})
