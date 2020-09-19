import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 50,
    padding: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})

type CIconProps = {
  icon: IconProp
  onPress?: (e: React.SyntheticEvent) => void
  size?: number
  color?: string
  style?: object
}

export const Icon = (props: CIconProps): JSX.Element => {
  const { icon, onPress, size = 25, color = 'white', style } = props
  return (
    <TouchableOpacity style={style || styles.iconContainer} onPress={onPress}>
      <FontAwesomeIcon icon={icon} color={color} size={size} />
    </TouchableOpacity>
  )
}
