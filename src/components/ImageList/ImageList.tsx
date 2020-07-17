import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import ImageViewerWrapper from '../ImageViewer'
import LoadingSpinner from '../LoadingSpinner'
import { ImageInfo } from '../../types/images.type'
import styles from './ImageListStyles'

const ImageList: React.FC<{
  items: ImageInfo[]
  isLoading: boolean
  hasError?: object | null
  onClear: () => void
}> = (props) => {
  const { items, isLoading, hasError, onClear } = props
  const [isViewerVisible, setViewerVisible] = useState(false)
  const [isOverlayMode, setOverlayMode] = useState(false)
  const [selectedId, setSelectedId] = useState(0)

  const handleOnClose = (): void => {
    setSelectedId(0)
    setViewerVisible(false)
  }

  const handleOnPress = (id: number): void => {
    const index = items.findIndex((item) => item.id === id)
    setSelectedId(index)
    setViewerVisible(true)
  }

  const renderItem = ({ item }: { item: ImageInfo }): JSX.Element => {
    const { id, author, date, title, url } = item
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleOnPress(id)}>
        <View>
          <Image style={styles.image} source={{ uri: url }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleLabel}>{title}</Text>
          <Text style={styles.authorLabel}>{author}</Text>
          <Text style={styles.dateLabel}>{date}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const clearImages = (): void => {
    setOverlayMode(true)
    onClear()
  }

  const renderClearButton = (): JSX.Element => {
    return (
      <TouchableOpacity style={styles.clearButton} onPress={clearImages}>
        <FontAwesomeIcon icon={faTrash} color="black" size={25} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.listContainer}>
      {hasError && (
        <Text style={styles.errorText}>
          Something went wrong. Please try again.
        </Text>
      )}
      {items?.length === 0 && !isLoading && (
        <Text style={styles.infoText}>No images to view.</Text>
      )}
      {items?.length > 0 && (
        <FlatList
          ListHeaderComponent={
            <Text style={styles.header}>
              {`${items.length} Document${items.length !== 1 ? 's' : ''}`}
            </Text>
          }
          data={items}
          renderItem={renderItem}
        />
      )}
      {isViewerVisible && (
        <ImageViewerWrapper
          isVisible={isViewerVisible}
          imagesUrls={items}
          imageStartIndex={selectedId}
          onCloseModal={handleOnClose}
        />
      )}
      {items?.length !== 0 && !isLoading && renderClearButton()}
      {isLoading && <LoadingSpinner asOverlay={isOverlayMode} />}
    </View>
  )
}

export default ImageList
