import { requestableSelector } from '../utils/requestableSelectors'
import { IImagesState } from '../types/images.type'

const domain = 'images'

export const imagesSelectors = {
  images: requestableSelector<IImagesState>(domain)
}
