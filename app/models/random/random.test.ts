import { RandomModel } from "./random"

test("can be created", () => {
  const instance = RandomModel.create({})

  expect(instance).toBeTruthy()
})
