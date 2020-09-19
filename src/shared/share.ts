import RNFetchBlob from 'react-native-fetch-blob'
import { getExtension } from './getFileExtension'
import * as mime from 'react-native-mime-types'
import Share from 'react-native-share'

export const shareImage = async (url: string): Promise<void> => {
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

    await Share.open(shareOptions)
    await fs.unlink(imagePath)
  } catch (error) {
    // NOTE: Calling this method will return a promise that
    // will fulfill or be REJECTED as soon as the user
    // successfully open the share action sheet or CANCEL/fail
    await fs.unlink(`${fs.dirs.DownloadDir}/${tmpImageFileName}.${ext}`)
    await fs.unlink(imagePath)
    if (error.message !== 'User did not share') {
      throw new Error('Share error')
    }
    // add analytics
  }
}
