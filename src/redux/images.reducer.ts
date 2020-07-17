import { createReducer } from 'typesafe-actions'
import { requestHandler } from '../utils/requestHandler'
import { imageActions } from './images.actions'

const initialState = {
  items: [],
  isLoading: false,
  error: null
}

const fetchHandler = requestHandler()
const clearHandler = requestHandler()

export const imagesReducer = createReducer(initialState)
  .handleAction(imageActions.fetch.request, fetchHandler.handleRequest)
  .handleAction(imageActions.fetch.success, fetchHandler.handleSuccess)
  .handleAction(imageActions.fetch.failure, fetchHandler.handleFailure)

  .handleAction(imageActions.clear.request, clearHandler.handleRequest)
  .handleAction(imageActions.clear.success, clearHandler.handleSuccess)
  .handleAction(imageActions.clear.failure, clearHandler.handleFailure)
