import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, Keyboard } from "react-native"
import { Screen, Text, Header, TextField, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing[4],
  justifyContent: "center",
}
const INPUT: TextStyle = {
  borderWidth: 1,
  padding: spacing[2],
  backgroundColor: color.palette.lighterGrey,
  borderColor: color.palette.lighterGrey,
  borderRadius: spacing[3],
  color: color.palette.black,
}
const BOLD: TextStyle = {
  fontWeight: "bold",
  textTransform: "uppercase",
  fontFamily: typography.primary,
}
const SUBMIT: ViewStyle = {
  marginHorizontal: spacing[4],
  paddingVertical: spacing[4],
  marginVertical: spacing[2],
}
const SUBMIT_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 18,
  letterSpacing: 2,
}
export const RandomAstDataScreen = observer(function RandomAstDataScreen() {
  // Pull in one of our MST stores
  const { randomStore } = useStores()
  const { onChangeRandomId, randomId } = randomStore
  const navigation: any = useNavigation()

  const onSubmit = async () => {
    Keyboard.dismiss()
    let status = await randomStore.fetchAstData()
    if (status) {
      navigation.navigate("randomDataDetail")
    }
  }
  const onRandomAstId = async () => {
    Keyboard.dismiss()
    await randomStore.fetchRandomId()
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        <Header leftIcon={"back"} headerText={"Home"} />
        <View style={CONTAINER}>
          <TextField
            placeholderTx={"random.placeholder"}
            placeholderTextColor={color.palette.black}
            inputStyle={INPUT}
            value={randomId}
            onChangeText={(text) => {
              onChangeRandomId(text)
            }}
          />
          <Button
            disabled={randomId ? false : true}
            style={[SUBMIT, { backgroundColor: randomId ? color.primary : color.dim }]}
            tx={"random.submit"}
            textStyle={SUBMIT_TEXT}
            onPress={() => {
              onSubmit()
            }}
            isLoading={randomStore.isSubmit}
          />
          <Button
            isLoading={randomStore.isRandom}
            style={[SUBMIT, { backgroundColor: color.palette.deepPurple }]}
            tx={"random.randomAstId"}
            textStyle={SUBMIT_TEXT}
            onPress={() => {
              onRandomAstId()
            }}
          />
        </View>
      </Screen>
    </View>
  )
})
