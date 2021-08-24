import { CountryModel } from "./country"

test("can be created", () => {
  const instance = CountryModel.create({})

  expect(instance).toBeTruthy()
})
