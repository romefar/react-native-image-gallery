import get from 'lodash.get'
import {ImageInfo} from '../types/images.type'

export const requestableSelector = <TState>(
  path: string
): {
  items: (state: TState) => ImageInfo[]
  isLoading: (state: TState) => boolean
  error: (state: TState) => object
} => {
  return {
    items: (state: TState): ImageInfo[] => get(state, `${path}.items`),
    isLoading: (state: TState): boolean => get(state, `${path}.isLoading`),
    error: (state: TState): object => get(state, `${path}.error`)
  }
}
