import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { SessionNutrient } from './sessionNutrient.model'

export class SessionNutrientApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<SessionNutrient>,
  ): Promise<SessionNutrient[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/sessionNutrients${buildOptions}`)
  }

  static findOne(
    sessionNutrientId: string,
    queryOptions?: ApiHelper.QueryOptions<SessionNutrient>,
  ): Promise<SessionNutrient> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/sessionNutrients/${sessionNutrientId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<SessionNutrient>): Promise<SessionNutrient> {
    return HttpService.api.post(`/v1/sessionNutrients`, values)
  }

  static updateOne(
    sessionNutrientId: string,
    values: Partial<SessionNutrient>,
  ): Promise<SessionNutrient> {
    return HttpService.api.patch(
      `/v1/sessionNutrients/${sessionNutrientId}`,
      values,
    )
  }

  static deleteOne(sessionNutrientId: string): Promise<void> {
    return HttpService.api.delete(`/v1/sessionNutrients/${sessionNutrientId}`)
  }

  static findManyBySessionId(
    sessionId: string,
    queryOptions?: ApiHelper.QueryOptions<SessionNutrient>,
  ): Promise<SessionNutrient[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/sessions/session/${sessionId}/sessionNutrients${buildOptions}`,
    )
  }

  static createOneBySessionId(
    sessionId: string,
    values: Partial<SessionNutrient>,
  ): Promise<SessionNutrient> {
    return HttpService.api.post(
      `/v1/sessions/session/${sessionId}/sessionNutrients`,
      values,
    )
  }

  static findManyByNutrientId(
    nutrientId: string,
    queryOptions?: ApiHelper.QueryOptions<SessionNutrient>,
  ): Promise<SessionNutrient[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/nutrients/nutrient/${nutrientId}/sessionNutrients${buildOptions}`,
    )
  }

  static createOneByNutrientId(
    nutrientId: string,
    values: Partial<SessionNutrient>,
  ): Promise<SessionNutrient> {
    return HttpService.api.post(
      `/v1/nutrients/nutrient/${nutrientId}/sessionNutrients`,
      values,
    )
  }
}
