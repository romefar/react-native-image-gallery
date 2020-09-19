import React, { useCallback, useState } from 'react'
import {
  faTimes,
  faDownload,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons'
import { Platform, View, Text, Alert, Modal } from 'react-native'
import { shareImage } from '../../shared/share'
import { getPermissionAndroid } from '../../shared/permissions/permissions'
import { download } from '../../shared/download'
import ImageViewer from 'react-native-image-zoom-viewer'
import { ImageViewerProps } from '../../types/images.type'
import { Icon } from '../../shared/components/Icon'
import styles from './ImageViewerStyles'

const ImageViewerWrapper: React.FC<ImageViewerProps> = (props) => {
  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const { imagesUrls, imageStartIndex, onCloseModal, isVisible } = props
  let isShareTouched: boolean = false

  const showError = (
    title = 'Error',
    message = 'Something went wrong. Please try again.'
  ) => {
    Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false })
  }

  const handleDownload = async (url: string): Promise<void> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid()
        if (!granted) {
          return
        }
      }
      await download(url)
    } catch (error) {
      showError(error.message)
    }
  }

  const handleShare = async (url: string): Promise<void> => {
    try {
      if (!isShareTouched) {
        isShareTouched = true
        await shareImage(url)
        isShareTouched = false
      }
    } catch (error) {
      showError(error.message)
    }
  }

  const renderHeader = (currentIndex?: number): JSX.Element => {
    const { url, title } = imagesUrls[currentIndex || 0]
    return (
      <View style={styles.headerContainer}>
        {isHeaderVisible && (
          <>
            <View style={styles.headerRow}>
              <Icon icon={faTimes} onPress={onCloseModal} />
              <View style={styles.actionsContainer}>
                <View style={styles.marginRight}>
                  <Icon icon={faDownload} onPress={() => handleDownload(url)} />
                </View>
                <Icon icon={faShareAlt} onPress={() => handleShare(url)} />
              </View>
            </View>
            <View style={[styles.headerRow, styles.flexCenter]}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </>
        )}
      </View>
    )
  }

  const handleImagePress = useCallback((): void => {
    setHeaderVisible((prevState) => !prevState)
  }, [])

  return (
    <Modal visible={isVisible}>
      <ImageViewer
        imageUrls={imagesUrls}
        index={imageStartIndex}
        enableSwipeDown
        swipeDownThreshold={400}
        onCancel={onCloseModal}
        saveToLocalByLongPress={false}
        renderHeader={renderHeader}
        renderIndicator={() => <></>}
        onClick={handleImagePress}
      />
    </Modal>
  )
}

ImageViewerWrapper.defaultProps = {
  imageStartIndex: 0
}

export default ImageViewerWrapper
