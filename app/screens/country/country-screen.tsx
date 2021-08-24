import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
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
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = {
  fontWeight: "bold",
}
const INPUT: TextStyle = {
  ...TEXT,
  borderWidth: 1,
  borderColor: color.palette.lighterGrey,
  backgroundColor: color.palette.lighterGrey,
  padding: spacing[2],
}
const SUBMIT: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}
const SUBMITTEXT: TextStyle = {
  ...BOLD,
  fontSize: 14,

  letterSpacing: 2,
  textTransform: "uppercase",
}

export const CountryScreen = observer(function CountryScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const { countryName, onChangeCountryName, fetchCountryDetail } = countryStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const onSubmit = async () => {
    let status = await fetchCountryDetail()
    if (status) {
      navigation.navigate("countryDetail")
    }
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="fixed">
        <View style={CONTAINER}>
          <TextField
            placeholderTx={"countryInput.placeholder"}
            inputStyle={INPUT}
            value={countryName}
            onChangeText={(text) => {
              onChangeCountryName(text)
            }}
          />
          <Button
            disabled={countryName ? false : true}
            tx={"countryInput.submit"}
            style={[SUBMIT, { backgroundColor: countryName ? color.primary : color.dim }]}
            textStyle={SUBMITTEXT}
            onPress={onSubmit}
          />
        </View>
      </Screen>
    </View>
  )
})
