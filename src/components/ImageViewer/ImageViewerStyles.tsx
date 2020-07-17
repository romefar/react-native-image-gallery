import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
    padding: 15,
    zIndex: 1000,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconContainer: {
    borderRadius: 50,
    padding: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  marginRight: { marginRight: 9 },
  flexCenter: { justifyContent: 'center' },
  title: {
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 12,
    padding: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
