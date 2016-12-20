import { Map } from 'immutable'
import {SET_STATE, SET_PROPERTY} from '../common/constants'

export default (state = new Map(), { type, payload }) => {
  switch (type) {
    case (SET_STATE):
      if(!payload instanceof Map){
        throw new Error('react-configurable-form must use immutable state')
      }
      return state.set(payload.name, payload.state)
    case (SET_PROPERTY):
      return state.setIn(payload.path, payload.value)
    default:
      return state
  }
}
