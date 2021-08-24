import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
export type GetPostResult = { kind: "ok"; post: any } | GeneralApiProblem
export type GetCountryResult = { kind: "ok"; country: any } | GeneralApiProblem
export type GetWeatherResult = { kind: "ok"; weather: any } | GeneralApiProblem
export type GetRandomIdResult = { kind: "ok"; randomId: any } | GeneralApiProblem
export type GetAstDataResult = { kind: "ok"; astData: any } | GeneralApiProblem
