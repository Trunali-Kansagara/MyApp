import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.transparent,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.offWhite,
  paddingStart: spacing[2],
  color: color.palette.black,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  marginHorizontal: spacing[4],
  marginTop: spacing[4],
}
const SUBMIT_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 14,
  letterSpacing: 2,
  textTransform: "uppercase",
}
export const RandomScreen = observer(function RandomScreen() {
  // Pull in one of our MST stores
  const { randomIdStore } = useStores()
  const { onChangeRandomId, randomId } = randomIdStore

  // Pull in navigation via hook
  const navigation: any = useNavigation()
  const [isValidText, setValidText] = useState<boolean>(false)
  useEffect(() => {
    randomIdStore.randomId ? setValidText(true) : setValidText(false)
  }, [randomIdStore.randomId])

  const onSubmit = async () => {
    let status = await randomIdStore.fetchAstData()
    if (status) {
      navigation.navigate("randomDataDetail")
    }
  }
  const onRandomAstID = async () => {
    await randomIdStore.fetchRandomID()
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        <View style={CONTAINER}>
          <TextField
            placeholderTx={"randomID.placeholder"}
            inputStyle={INPUT}
            placeholderTextColor={color.palette.black}
            value={randomId}
            onChangeText={(text) => {
              onChangeRandomId(text)
            }}
          />
          <Button
            tx={"randomID.submit"}
            style={[SUBMIT, { backgroundColor: !isValidText ? color.dim : color.primary }]}
            textStyle={SUBMIT_TEXT}
            onPress={onSubmit}
            disabled={randomIdStore.randomId ? false : true}
            isLoading={randomIdStore.isLoading}
          />
          <Button
            tx={"randomID.randomAstId"}
            style={[SUBMIT]}
            textStyle={SUBMIT_TEXT}
            onPress={onRandomAstID}
            isLoading={randomIdStore.isRandom}
          />
        </View>
      </Screen>
    </View>
  )
})
