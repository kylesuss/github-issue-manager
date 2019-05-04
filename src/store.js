import rootReducer from 'reducers'
import { createStore, compose } from 'redux'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

const reducer = compose(
  mergePersistedState((initialState, persistedState) => {
    return {
      ...initialState,
      ...persistedState
    }
  })
)(rootReducer)

const storage = compose(
  filter(['github'])
)(adapter(window.localStorage))

const enhancer = compose(
  persistState(storage, 'app'),
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f
)

const store = createStore(reducer, enhancer)

export default store
