import { combineReducers, Reducer } from 'redux'
import { StateType } from 'typesafe-actions'
import { imagesReducer } from './images.reducer'

const rootReducer = combineReducers({
  images: imagesReducer
})

type RootReducer = StateType<typeof rootReducer>

export default (): Reducer<RootReducer> => {
  return rootReducer
}
