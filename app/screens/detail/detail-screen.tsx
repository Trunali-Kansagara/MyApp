import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { TxKeyPath } from "../../i18n"
import { useNavigation } from "@react-navigation/core"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TITLE: TextStyle = {
  fontWeight: "bold",
  color: color.palette.black,
  fontSize: 16,
}
const VALUE: TextStyle = {
  // fontWeight: "bold",
  color: color.palette.black,
  fontFamily: typography.secondary,
  fontSize: 14,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  padding: spacing[4],
  borderBottomWidth: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  // margin: spacing[4],
}

export const DetailScreen = observer(function DetailScreen() {
  // Pull in one of our MST stores
  const { homeStore } = useStores()
  const { astData } = homeStore
  console.log("astDataa====", astData)

  // Pull in navigation via hook
  const navigation = useNavigation()

  const renderRows = (title: TxKeyPath, value: any) => {
    return (
      <View style={ROWS}>
        <Text tx={title} preset={"bold"} style={TITLE} />
        <Text text={" : "} preset={"bold"} style={TITLE} />
        <Text text={value} style={VALUE} />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={"Detail Screen"} titleStyle={TITLE} />
      <View style={CONTAINER}>
        {renderRows("detail.name", astData.name)}
        {renderRows("detail.nasa_ip_url", astData.nasa_jpl_url.toString())}
        {renderRows(
          "detail.is_potentially_hazardous_asteroid",
          astData.is_potentially_hazardous_asteroid.toString(),
        )}
      </View>
    </Screen>
  )
})
