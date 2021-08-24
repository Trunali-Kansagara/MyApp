import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetAstDataResult, GetRandomIdResult } from "../../services/api"
import { findRandomObject } from "../../utils/constant"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const RandomModel = types
  .model("Random")
  .props({
    randomId: types.optional(types.string, ""),
    isRandom: types.optional(types.boolean, false),
    astData: types.optional(types.frozen(), null),
    isSubmit: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onChangeRandomId(randomId: string) {
      self.randomId = randomId
    },
    fetchRandomId: flow(function* fetchRandomId() {
      try {
        self.isRandom = true
        const data: GetRandomIdResult = yield api.getRandomId()
        if (data.kind === "ok") {
          const response = data.randomId.near_earth_objects
          const randomObject = findRandomObject(response)
          self.randomId = randomObject.id
          self.isRandom = false
          return true
        } else {
          self.isRandom = false
          Alert.alert("Id not found")
          return false
        }
      } catch (error) {
        self.isRandom = false
        Alert.alert("something wrong")
      }
    }),

    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isSubmit = true
        const data: GetAstDataResult = yield api.getAstData(self.randomId)
        if (data.kind === "ok") {
          const response = data.astData
          self.astData = response
          self.isSubmit = false
          return true
        } else {
          self.isSubmit = false
          self.astData = null
          Alert.alert("Data not found")
          return false
        }
      } catch (error) {}
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type RandomType = Instance<typeof RandomModel>
export interface Random extends RandomType {}
type RandomSnapshotType = SnapshotOut<typeof RandomModel>
export interface RandomSnapshot extends RandomSnapshotType {}
export const createRandomDefaultModel = () => types.optional(RandomModel, {})
