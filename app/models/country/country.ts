import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetCountryResult, GetWeatherResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const CountryModel = types
  .model("Country")
  .props({
    countryName: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    countryData: types.optional(types.frozen(), null),
    weatherData: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onChangeCountryName(countryName: string) {
      self.countryName = countryName
    },
    fetchCountryDetail: flow(function* fetchCountryDetail() {
      try {
        self.isLoading = true
        const data: GetCountryResult = yield api.getCountryDetail(self.countryName)
        if (data.kind === "ok") {
          let response = data.country
          for (let index = 0; index < response.length; index++) {
            const element = response[index]
            if (element.name.toLowerCase() === self.countryName.toLowerCase()) {
              self.countryData = element
              self.isLoading = false
            } else {
              self.countryData = response[0]
              self.isLoading = false
            }
          }

          return true
        } else {
          self.isLoading = false
          Alert.alert("data not found")
          return false
        }
      } catch (error) {
        Alert.alert(error)
      }
    }),
    fetchWeatherDetail: flow(function* fetchWeatherDetail(capitalName) {
      try {
        self.isLoading = true
        const data: GetWeatherResult = yield api.getWeatherDetail(capitalName)
        console.log("data====", data)

        if (data.kind == "ok") {
          self.weatherData = data.weather
          self.isLoading = false
        } else {
          self.weatherData = null
          self.isLoading = false
        }
      } catch (error) {
        Alert.alert("somethine wrong")
        self.isLoading = false
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CountryType = Instance<typeof CountryModel>
export interface Country extends CountryType {}
type CountrySnapshotType = SnapshotOut<typeof CountryModel>
export interface CountrySnapshot extends CountrySnapshotType {}
export const createCountryDefaultModel = () => types.optional(CountryModel, {})
