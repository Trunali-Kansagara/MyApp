import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header, TextField, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing[4],
  justifyContent: "center",
}
const INPUT: TextStyle = {
  backgroundColor: color.line,
  color: color.palette.black,
  padding: spacing[2],
  borderWidth: 1,
  borderColor: color.palette.lightGrey,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  marginHorizontal: spacing[4],
}
const SUBMIT_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 14,
  textTransform: "uppercase",
}

export const CountryInputScreen = observer(function CountryInputScreen() {
  // Pull in one of our MST stores
  const { countStore } = useStores()
  const { countryName, onChangeCountryName } = countStore
  // Pull in navigation via hook
  const navigation: any = useNavigation()

  const onSubmit = async () => {
    let status = await countStore.fetchCountyDetail()
    if (status) {
      navigation.navigate("countryDetail")
      countStore.updateWeatherDetail(null)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText={"Country Input"} leftIcon={"back"} />
      <View style={CONTAINER}>
        <TextField
          placeholder={"Enter Country"}
          inputStyle={INPUT}
          placeholderTextColor={color.palette.black}
          value={countryName}
          onChangeText={(value) => {
            onChangeCountryName(value)
          }}
        />
        <Button
          text={"submit"}
          style={[SUBMIT, { backgroundColor: countryName ? color.primary : color.dim }]}
          textStyle={SUBMIT_TEXT}
          onPress={() => {
            onSubmit()
          }}
          disabled={countryName ? false : true}
          isLoading={countStore.isLoading}
        />
      </View>
    </Screen>
  )
})
