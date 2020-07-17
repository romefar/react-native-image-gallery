import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#960019'
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    borderRadius: 15,
    width: 100,
    height: 100
  },
  infoContainer: {
    marginLeft: 25
  },
  titleLabel: {
    fontSize: 20,
    marginBottom: 7,
    fontWeight: 'bold'
  },
  authorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#696969'
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: '#929292'
  }
})
