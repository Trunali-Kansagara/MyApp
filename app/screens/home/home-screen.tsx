import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const renderButtons = (title, route) => {
    return (
      <Button
        text={title}
        onPress={() => {
          navigation.navigate(route)
        }}
        style={{ margin: 10, paddingVertical: 10 }}
      />
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <View>
        {renderButtons("Post List", "postList")}
        {renderButtons("County Data", "countryInput")}
        {renderButtons("Random Ast Data", "randomData")}
      </View>
    </Screen>
  )
})
