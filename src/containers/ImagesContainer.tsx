import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages, clearImages } from '../redux/images.dispatchers'
import ImageList from '../components/ImageList'
import { imagesSelectors } from '../redux/images.selectors'

export const ImagesContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const items = useSelector(imagesSelectors.images.items)
  const error = useSelector(imagesSelectors.images.error)
  const isLoading = useSelector(imagesSelectors.images.isLoading)

  const handleClearImages = () => {
    clearImages(dispatch)()
  }

  useEffect(() => {
    fetchImages(dispatch)()
  }, [dispatch])

  return (
    <ImageList
      items={items}
      isLoading={isLoading}
      hasError={error}
      onClear={handleClearImages}
    />
  )
}
