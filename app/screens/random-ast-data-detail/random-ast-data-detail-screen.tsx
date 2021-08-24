import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { TxKeyPath } from "../../i18n"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  // marginHorizontal: spacing[4],
  justifyContent: "center",
  // alignItems: "center",
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingVertical: spacing[2],
  borderBottomWidth: 1,
  paddingHorizontal: spacing[4],
  alignItems: "center",
}
const TITLE: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  letterSpacing: 1.8,
}
const VALUE: TextStyle = {
  fontSize: 14,
  lineHeight: 18,
  letterSpacing: 2,
  fontWeight: "500",
  fontFamily: typography.primary,
}
export const RandomAstDataDetailScreen = observer(function RandomAstDataDetailScreen() {
  // Pull in one of our MST stores
  const { randomStore } = useStores()
  const { astData } = randomStore
  const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = astData

  console.log("astData===", astData)

  const renderRows = (title: TxKeyPath, value: any) => {
    return (
      <View style={ROWS}>
        <Text tx={title} preset={"bold"} style={TITLE} />
        <Text text={value} style={VALUE} />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={"Detail Screen"} />
      <View style={CONTAINER}>
        {renderRows("randomDetail.name", name)}
        {renderRows("randomDetail.url", nasa_jpl_url)}
        {renderRows("randomDetail.precip", is_potentially_hazardous_asteroid.toString())}
      </View>
    </Screen>
  )
})
