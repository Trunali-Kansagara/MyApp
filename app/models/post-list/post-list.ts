import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetPostResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostListModel = types
  .model("PostList")
  .props({
    pageNo: types.optional(types.number, 0),
    postListData: types.optional(types.frozen(), null),
    isLoading: types.optional(types.boolean, false),
    postListDetail: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchPost: flow(function* fetchPost() {
      try {
        self.pageNo = 0
        self.isLoading = true
        const response: GetPostResult = yield api.getPost(self.pageNo)
        if (response.kind === "ok") {
          self.postListData = response.post.hits
          self.isLoading = false
        } else {
          self.isLoading = false
          self.postListData = null
        }
      } catch (error) {
        self.isLoading = null
        Alert.alert("error====", error)
      }
    }),

    fetchMorePost: flow(function* fetchMorePost() {
      try {
        self.isLoading = true
        self.pageNo = self.pageNo + 1
        const response: GetPostResult = yield api.getPost(self.pageNo)
        if (response.kind === "ok") {
          let data = [...self.postListData, ...response.post.hits]
          self.postListData = data
          self.isLoading = false
        } else {
          self.isLoading = false
          self.postListData = null
        }
      } catch (error) {
        self.isLoading = false
        Alert.alert("error===", error)
      }
    }),

    updatePostListDetail(postListDetail: any) {
      self.postListDetail = postListDetail
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PostListType = Instance<typeof PostListModel>
export interface PostList extends PostListType {}
type PostListSnapshotType = SnapshotOut<typeof PostListModel>
export interface PostListSnapshot extends PostListSnapshotType {}
export const createPostListDefaultModel = () => types.optional(PostListModel, {})
