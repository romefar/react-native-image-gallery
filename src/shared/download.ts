import RNFetchBlob from 'react-native-fetch-blob'
import { getExtension } from './getFileExtension'

export const download = async (url: string) => {
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
}