import { RandomDAtaModel } from "./random-d-ata"

test("can be created", () => {
  const instance = RandomDAtaModel.create({})

  expect(instance).toBeTruthy()
})
