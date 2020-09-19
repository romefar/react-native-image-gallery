import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from './LoadingSpinnerStyles'

const LoadingSpinner: React.FC<{
  asOverlay?: boolean
  size?: number | 'small' | 'large'
  color?: string
}> = (props) => {
  const { asOverlay, size, color } = props

  if (asOverlay) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={size} color={color} />
      </View>
    )
  }

  return <ActivityIndicator size={size} color={color} />
}
LoadingSpinner.defaultProps = {
  size: 'large',
  color: 'black',
  asOverlay: false
}

export default LoadingSpinner
