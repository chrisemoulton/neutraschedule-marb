import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { LiquidLevel } from './liquidLevel.model'

export class LiquidLevelApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<LiquidLevel>,
  ): Promise<LiquidLevel[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/liquidLevels${buildOptions}`)
  }

  static findOne(
    liquidLevelId: string,
    queryOptions?: ApiHelper.QueryOptions<LiquidLevel>,
  ): Promise<LiquidLevel> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/liquidLevels/${liquidLevelId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<LiquidLevel>): Promise<LiquidLevel> {
    return HttpService.api.post(`/v1/liquidLevels`, values)
  }

  static updateOne(
    liquidLevelId: string,
    values: Partial<LiquidLevel>,
  ): Promise<LiquidLevel> {
    return HttpService.api.patch(`/v1/liquidLevels/${liquidLevelId}`, values)
  }

  static deleteOne(liquidLevelId: string): Promise<void> {
    return HttpService.api.delete(`/v1/liquidLevels/${liquidLevelId}`)
  }

  static findManyByDeviceId(
    deviceId: string,
    queryOptions?: ApiHelper.QueryOptions<LiquidLevel>,
  ): Promise<LiquidLevel[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/devices/device/${deviceId}/liquidLevels${buildOptions}`,
    )
  }

  static createOneByDeviceId(
    deviceId: string,
    values: Partial<LiquidLevel>,
  ): Promise<LiquidLevel> {
    return HttpService.api.post(
      `/v1/devices/device/${deviceId}/liquidLevels`,
      values,
    )
  }
}
