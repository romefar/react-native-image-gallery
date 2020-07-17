import { requestActionTypes } from '../utils/requestActionTypes'

const module = 'gallery'
const model = 'images'
const prefix = `${module}/${model}`

const actionTypes = requestActionTypes(prefix)

export const imagesActionsTypes = {
  fetch: actionTypes('fetch'),
  clear: actionTypes('clear')
}
