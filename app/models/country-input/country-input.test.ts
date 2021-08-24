import { CountryInputModel } from "./country-input"

test("can be created", () => {
  const instance = CountryInputModel.create({})

  expect(instance).toBeTruthy()
})
