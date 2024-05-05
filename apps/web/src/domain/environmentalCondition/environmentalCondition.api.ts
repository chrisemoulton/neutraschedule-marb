import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { EnvironmentalCondition } from './environmentalCondition.model'

export class EnvironmentalConditionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/environmentalConditions${buildOptions}`)
  }

  static findOne(
    environmentalConditionId: string,
    queryOptions?: ApiHelper.QueryOptions<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/environmentalConditions/${environmentalConditionId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition> {
    return HttpService.api.post(`/v1/environmentalConditions`, values)
  }

  static updateOne(
    environmentalConditionId: string,
    values: Partial<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition> {
    return HttpService.api.patch(
      `/v1/environmentalConditions/${environmentalConditionId}`,
      values,
    )
  }

  static deleteOne(environmentalConditionId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/environmentalConditions/${environmentalConditionId}`,
    )
  }

  static findManyBySessionId(
    sessionId: string,
    queryOptions?: ApiHelper.QueryOptions<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/sessions/session/${sessionId}/environmentalConditions${buildOptions}`,
    )
  }

  static createOneBySessionId(
    sessionId: string,
    values: Partial<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition> {
    return HttpService.api.post(
      `/v1/sessions/session/${sessionId}/environmentalConditions`,
      values,
    )
  }
}
