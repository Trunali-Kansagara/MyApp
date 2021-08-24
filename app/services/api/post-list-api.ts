import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetCharactersResult, GetPostResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class PostListApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getPost(pageNo: number): Promise<GetPostResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNo}`,
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const post = response.data

      return { kind: "ok", post }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
