import { PostListModel } from "./post-list"

test("can be created", () => {
  const instance = PostListModel.create({})

  expect(instance).toBeTruthy()
})
