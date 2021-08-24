import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { CountryInputModel } from "../country-input/country-input"
import { CountryModel } from "../country/country"
import { PostListModel } from "../post-list/post-list"
import { RandomDAtaModel } from "../random-d-ata/random-d-ata"
import { RandomModel } from "../random/random"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  postListStore:types.optional(PostListModel,{} as any),
  countStore:types.optional(CountryInputModel,{} as any),
  countryStore:types.optional(CountryModel,{} as any),
  randomStore:types.optional(RandomModel,{} as any),
  randomIdStore:types.optional(RandomDAtaModel,{} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
