import { imageActions } from './images.actions'

export const fetchImages = (dispatch: Function) => () => {
  dispatch(imageActions.fetch.request())
}

export const clearImages = (dispatch: Function) => () => {
  dispatch(imageActions.clear.request())
}
