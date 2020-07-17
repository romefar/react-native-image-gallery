export interface ImageInfo {
  url: string
  author: string
  title: string
  date: string
  id: number
}
export interface ImageViewerProps {
  imagesUrls: ImageInfo[]
  imageStartIndex: number
  onCloseModal: () => void
  isVisible: boolean
}

export interface IRequestable<TError = unknown> {
  isLoading: boolean
  items: ImageInfo[] | []
  error: TError
}

export interface IImagesState extends IRequestable {}
