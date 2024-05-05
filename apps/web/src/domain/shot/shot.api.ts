import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Shot } from './shot.model'

export class ShotApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Shot>,
  ): Promise<Shot[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/shots${buildOptions}`)
  }

  static findOne(
    shotId: string,
    queryOptions?: ApiHelper.QueryOptions<Shot>,
  ): Promise<Shot> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/shots/${shotId}${buildOptions}`)
  }

  static createOne(values: Partial<Shot>): Promise<Shot> {
    return HttpService.api.post(`/v1/shots`, values)
  }

  static updateOne(shotId: string, values: Partial<Shot>): Promise<Shot> {
    return HttpService.api.patch(`/v1/shots/${shotId}`, values)
  }

  static deleteOne(shotId: string): Promise<void> {
    return HttpService.api.delete(`/v1/shots/${shotId}`)
  }

  static findManyByDeviceId(
    deviceId: string,
    queryOptions?: ApiHelper.QueryOptions<Shot>,
  ): Promise<Shot[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/devices/device/${deviceId}/shots${buildOptions}`,
    )
  }

  static createOneByDeviceId(
    deviceId: string,
    values: Partial<Shot>,
  ): Promise<Shot> {
    return HttpService.api.post(`/v1/devices/device/${deviceId}/shots`, values)
  }
}
