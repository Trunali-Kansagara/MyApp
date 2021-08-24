import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetCountryResult, GetWeatherResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const CountryInputModel = types
  .model("CountryInput")
  .props({
    countryName: types.optional(types.string, ""),
    countryData: types.optional(types.frozen(), null),
    isLoading: types.optional(types.boolean, false),
    weatherData: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onChangeCountryName(countryName: string) {
      self.countryName = countryName
    },
    fetchCountyDetail: flow(function* fetchCountyDetail() {
      try {
        let isFound = false
        const data: GetCountryResult = yield api.getCountryDetail(self.countryName)
        if (data.kind === "ok") {
          const response = data.country
          for (let index = 0; index < response.length; index++) {
            if (response[index].name.toLowerCase() === self.countryName.toLowerCase()) {
              self.countryData = response[index]
              self.isLoading = false
              isFound = true
              return true
            }
          }
          if (!isFound && response.length > 0) {
            self.countryData = response[0]
            return true
          }
        } else {
          self.countryData = null
          Alert.alert("data not found")
          return false
          // showAlert("common.somethingWrong");
        }
      } catch (erro) {}
    }),
    fetchWeatherDetail: flow(function* fetchWeatherDetail(capitalName) {
      try {
        self.isLoading = true
        const data: GetWeatherResult = yield api.getWeatherDetail(capitalName)
        console.log("response====", data)

        if (data.kind === "ok") {
          self.weatherData = data.weather
          self.isLoading = false
        } else {
          self.isLoading = false
          self.weatherData = null
        }
      } catch (error) {
        self.isLoading = false
      }
    }),
    updateWeatherDetail(weatherData: any) {
      self.weatherData = weatherData
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CountryInputType = Instance<typeof CountryInputModel>
export interface CountryInput extends CountryInputType {}
type CountryInputSnapshotType = SnapshotOut<typeof CountryInputModel>
export interface CountryInputSnapshot extends CountryInputSnapshotType {}
export const createCountryInputDefaultModel = () => types.optional(CountryInputModel, {})
