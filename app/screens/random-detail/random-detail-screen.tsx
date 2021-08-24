import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  marginHorizontal: spacing[4],
  marginVertical: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.black,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: spacing[2],
}
const TITLE: TextStyle = {
  ...TEXT,
  flex: 3,
  fontSize: 16,
  letterSpacing: 1.8,
  lineHeight: 20,
}
const VALUE: TextStyle = {
  ...TEXT,
  flex: 7,
  fontSize: 14,
  letterSpacing: 1.8,
  lineHeight: 20,
}

export const RandomDetailScreen = observer(function RandomDetailScreen() {
  // Pull in one of our MST stores
  const { randomIdStore } = useStores()
  const { astData } = randomIdStore
  const { name } = astData
  console.log("astData=====", astData)

  const renderRows = (title: string, value: any) => {
    return (
      <View style={ROWS}>
        <Text text={title} preset={"bold"} style={TITLE} />
        <Text preset={"bold"} text={":"} style={[TITLE, { flex: 0.5 }]} />
        <Text preset={"default"} text={value} style={VALUE} />
      </View>
    )
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon={"back"}
        headerText={"Detail"}
        titleStyle={[TITLE, { paddingTop: spacing[3], fontWeight: "bold", flex: 0 }]}
      />
      <View style={CONTAINER}>
        {renderRows("Name", name)}
        {renderRows("Url", randomIdStore.astData.nasa_jpl_url)}
        {renderRows(
          "is_potentially_hazardous_asteroid",
          astData.is_potentially_hazardous_asteroid.toString(),
        )}
      </View>
    </Screen>
  )
})
