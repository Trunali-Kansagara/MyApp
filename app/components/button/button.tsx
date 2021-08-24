import * as React from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    isLoading,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text tx={tx} text={text} style={textStyles} />
  const loader = children || <ActivityIndicator size={"small"} color={color.palette.white} />

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {isLoading ? loader : content}
    </TouchableOpacity>
  )
}
