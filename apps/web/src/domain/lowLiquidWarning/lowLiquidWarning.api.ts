import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { LowLiquidWarning } from './lowLiquidWarning.model'

export class LowLiquidWarningApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<LowLiquidWarning>,
  ): Promise<LowLiquidWarning[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/lowLiquidWarnings${buildOptions}`)
  }

  static findOne(
    lowLiquidWarningId: string,
    queryOptions?: ApiHelper.QueryOptions<LowLiquidWarning>,
  ): Promise<LowLiquidWarning> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/lowLiquidWarnings/${lowLiquidWarningId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<LowLiquidWarning>,
  ): Promise<LowLiquidWarning> {
    return HttpService.api.post(`/v1/lowLiquidWarnings`, values)
  }

  static updateOne(
    lowLiquidWarningId: string,
    values: Partial<LowLiquidWarning>,
  ): Promise<LowLiquidWarning> {
    return HttpService.api.patch(
      `/v1/lowLiquidWarnings/${lowLiquidWarningId}`,
      values,
    )
  }

  static deleteOne(lowLiquidWarningId: string): Promise<void> {
    return HttpService.api.delete(`/v1/lowLiquidWarnings/${lowLiquidWarningId}`)
  }

  static findManyByLevelId(
    levelId: string,
    queryOptions?: ApiHelper.QueryOptions<LowLiquidWarning>,
  ): Promise<LowLiquidWarning[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/liquidLevels/level/${levelId}/lowLiquidWarnings${buildOptions}`,
    )
  }

  static createOneByLevelId(
    levelId: string,
    values: Partial<LowLiquidWarning>,
  ): Promise<LowLiquidWarning> {
    return HttpService.api.post(
      `/v1/liquidLevels/level/${levelId}/lowLiquidWarnings`,
      values,
    )
  }
}
