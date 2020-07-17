import React, { useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faTimes,
  faDownload,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons'
import Share from 'react-native-share'
import RNFetchBlob from 'react-native-fetch-blob'
import * as mime from 'react-native-mime-types'
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Modal
} from 'react-native'

import ImageViewer from 'react-native-image-zoom-viewer'
import { ImageViewerProps } from '../../types/images.type'
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

  const getPermissionAndroid = async (): Promise<boolean | undefined> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      showError(
        'Save image',
        'Your permission is required to save images to your device'
      )
    } catch (err) {
      showError('Error', 'Failed to save Image')
    }
  }

  const getExtension = (filename: string): string => {
    return filename.split('.').reverse()[0]
  }

  const handleDownload = async (url: string): Promise<void> => {
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid()
      if (!granted) {
        return
      }
    }
    try {
      const date = new Date()
      const ext = `.${getExtension(url)}`
      const { config, fs } = RNFetchBlob
      const PictureDir = fs.dirs.PictureDir
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image'
        }
      }
      await config(options).fetch('GET', url)
    } catch (error) {
      showError('Download error')
    }
  }

  const handleShare = async (url: string): Promise<void> => {
    let imagePath: string = ''
    let tmpImageFileName: string = ''
    const ext = getExtension(url)
    const mimeType = mime.types[ext]
    const { config, fs } = RNFetchBlob
    try {
      const date = new Date()
      const response = await config({ fileCache: true }).fetch('GET', url)
      imagePath = response.path()
      const imageData = await response.readFile('base64')
      const imageBase64 = `data:${mimeType};base64,${imageData}`
      tmpImageFileName = `share_tmp_${date.getTime() + date.getSeconds() / 2}`
      const shareOptions = {
        title: 'Default sharing text',
        message: 'Cool message',
        url: imageBase64,
        subject: 'Check this.',
        type: 'image/jpeg',
        filename: tmpImageFileName
      }
      // prevent multiply touches on share icon
      if (!isShareTouched) {
        isShareTouched = true
        await Share.open(shareOptions)
        await fs.unlink(imagePath)
        isShareTouched = false
      }
    } catch (error) {
      // NOTE: Calling this method will return a promise that
      // will fulfill or be REJECTED as soon as the user
      // successfully open the share action sheet or CANCEL/fail
      await fs.unlink(`${fs.dirs.DownloadDir}/${tmpImageFileName}.${ext}`)
      await fs.unlink(imagePath)
      if (error.message !== 'User did not share') {
        showError('Share error')
      }
      isShareTouched = false
      // add analytics
    }
  }

  const renderIconButton = (
    icon: IconProp,
    onPress: (e: React.SyntheticEvent) => void,
    size = 25,
    color = 'white'
  ): JSX.Element => {
    return (
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <FontAwesomeIcon icon={icon} color={color} size={size} />
      </TouchableOpacity>
    )
  }

  const renderHeader = (currentIndex?: number): JSX.Element => {
    const { url, title } = imagesUrls[currentIndex || 0]
    return (
      <View style={styles.headerContainer}>
        {isHeaderVisible && (
          <>
            <View style={styles.headerRow}>
              {renderIconButton(faTimes, onCloseModal)}
              <View style={styles.actionsContainer}>
                <View style={styles.marginRight}>
                  {renderIconButton(faDownload, () => handleDownload(url))}
                </View>
                {renderIconButton(faShareAlt, () => handleShare(url))}
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

  const handleImagePress = (): void => {
    setHeaderVisible((prevState) => !prevState)
  }

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
        renderIndicator={() => {}}
        onClick={handleImagePress}
      />
    </Modal>
  )
}

ImageViewerWrapper.defaultProps = {
  imageStartIndex: 0
}

export default ImageViewerWrapper
