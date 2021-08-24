import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { TxKeyPath } from "../../i18n"
import { SvgUri } from "react-native-svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const BOLD: TextStyle = {
  fontWeight: "bold",
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
const TITLE: TextStyle = {
  ...BOLD,
  ...TEXT,
  fontSize: 16,
  lineHeight: 20,
  letterSpacing: 2,
  paddingVertical: spacing[2],
}
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  marginHorizontal: spacing[4],
  flex: 1,
  alignItems: "center",
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
}
const VALUE: TextStyle = {
  ...TEXT,
  letterSpacing: 2,
  lineHeight: 18,
  fontSize: 14,
}
const WEATHER: ViewStyle = {
  width: "80%",
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
  marginVertical: spacing[3],
}
const WEATHER_TEXT: TextStyle = {
  ...BOLD,
  textTransform: "uppercase",
  fontSize: 12,
  letterSpacing: 2,
}
export const CountryDetailScreen = observer(function CountryDetailScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const { countryData, weatherData, fetchWeatherDetail } = countryStore
  const { capital, population, flag, latlng } = countryData

  const onWeatherDetail = async () => {
    if (countryStore.countryData && countryStore.countryData.capital)
      await fetchWeatherDetail(countryStore.countryData.capital)
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const renderRows = (title: TxKeyPath, value: any) => {
    return (
      <View style={ROWS}>
        <Text preset={"bold"} tx={title} style={TITLE} />
        <Text text={value} style={VALUE} />
      </View>
    )
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        <Header leftIcon={"back"} headerText={"Country Detail"} titleStyle={TITLE} />
        <View style={CONTAINER}>
          {renderRows("countryDetail.capital", capital)}
          {renderRows("countryDetail.population", population)}
          {renderRows("countryDetail.latlng", latlng[0] + " , " + latlng[1])}

          {/* //flag view */}
          <View style={ROWS}>
            <Text tx={"countryDetail.flag"} style={TITLE} />
            <SvgUri uri={flag} height={50} width={50} />
          </View>
          {/* weather detail  */}

          <Button
            onPress={onWeatherDetail}
            tx={"countryDetail.weatherDetail"}
            style={WEATHER}
            textStyle={WEATHER_TEXT}
            isLoading={countryStore.isLoading}
          />
          {weatherData && (
            <View>
              <Text text={"Weather Detail"} preset={"bold"} style={TITLE} />
              {renderRows(
                "countryDetail.weather",
                weatherData.current && weatherData.current.pressure,
              )}
              <View style={ROWS}>
                <Text text={"Weather icon : "} preset={"bold"} style={TITLE} />
                <Image
                  source={{ uri: weatherData.current && weatherData.current.weather_icons[0] }}
                  style={{ height: 50, width: 50 }}
                />
              </View>
            </View>
          )}
        </View>
      </Screen>
    </View>
  )
})
