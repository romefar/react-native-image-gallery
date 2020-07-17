import { createAsyncAction } from 'typesafe-actions'
import { ImageInfo } from '../types/images.type'
import { imagesActionsTypes } from './images.actionTypes'

export const imageActions = {
  fetch: createAsyncAction(
    imagesActionsTypes.fetch.request,
    imagesActionsTypes.fetch.success,
    imagesActionsTypes.fetch.failure
  )<undefined, ImageInfo[], object>(),
  clear: createAsyncAction(
    imagesActionsTypes.clear.request,
    imagesActionsTypes.clear.success,
    imagesActionsTypes.clear.failure
  )<undefined, undefined, object>()
}
