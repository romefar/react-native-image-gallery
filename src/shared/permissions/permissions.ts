import { PermissionsAndroid } from 'react-native'

export const getPermissionAndroid = async (): Promise<boolean | undefined> => {
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
    throw new Error('Your permission is required to save images to your device')
  } catch (err) {
    throw new Error('Failed to save an image')
  }
}
