import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetAstDataResult, GetRandomIdResult } from "../../services/api"
import { getRandomObject } from "../../utils/constant"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const RandomDAtaModel = types
  .model("RandomDAta")
  .props({
    randomId: types.optional(types.string, ""),
    isRandom: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
    astData: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onChangeRandomId(randomId: string) {
      self.randomId = randomId
    },
    fetchRandomID: flow(function* fetchRandomID() {
      try {
        self.isRandom = true
        const data: GetRandomIdResult = yield api.getRandomId()
        if (data.kind === "ok") {
          const response = data.randomId.near_earth_objects
          let randomObject = getRandomObject(response)
          console.log("data=====", randomObject.id)
          self.randomId = randomObject.id
          self.isRandom = false
          return true
        } else {
          self.isRandom = false
          Alert.alert("RandomAstID", data.kind)
          return false
        }
      } catch (error) {}
    }),
    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isLoading = true
        const data: GetAstDataResult = yield api.getAstData(self.randomId)
        if (data.kind === "ok") {
          const response = data.astData
          self.astData = response
          self.isLoading = false
          return true
        } else {
          self.astData = null
          self.isLoading = false
          Alert.alert("Please Enter Valid Id")
          return false
        }
      } catch (error) {}
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type RandomDAtaType = Instance<typeof RandomDAtaModel>
export interface RandomDAta extends RandomDAtaType {}
type RandomDAtaSnapshotType = SnapshotOut<typeof RandomDAtaModel>
export interface RandomDAtaSnapshot extends RandomDAtaSnapshotType {}
export const createRandomDAtaDefaultModel = () => types.optional(RandomDAtaModel, {})
