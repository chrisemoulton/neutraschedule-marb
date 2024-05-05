import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Log } from './log.model'

export class LogApi {
  static findMany(queryOptions?: ApiHelper.QueryOptions<Log>): Promise<Log[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/logs${buildOptions}`)
  }

  static findOne(
    logId: string,
    queryOptions?: ApiHelper.QueryOptions<Log>,
  ): Promise<Log> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/logs/${logId}${buildOptions}`)
  }

  static createOne(values: Partial<Log>): Promise<Log> {
    return HttpService.api.post(`/v1/logs`, values)
  }

  static updateOne(logId: string, values: Partial<Log>): Promise<Log> {
    return HttpService.api.patch(`/v1/logs/${logId}`, values)
  }

  static deleteOne(logId: string): Promise<void> {
    return HttpService.api.delete(`/v1/logs/${logId}`)
  }

  static findManyByDeviceId(
    deviceId: string,
    queryOptions?: ApiHelper.QueryOptions<Log>,
  ): Promise<Log[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/devices/device/${deviceId}/logs${buildOptions}`,
    )
  }

  static createOneByDeviceId(
    deviceId: string,
    values: Partial<Log>,
  ): Promise<Log> {
    return HttpService.api.post(`/v1/devices/device/${deviceId}/logs`, values)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Log>,
  ): Promise<Log[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/logs${buildOptions}`)
  }

  static createOneByUserId(userId: string, values: Partial<Log>): Promise<Log> {
    return HttpService.api.post(`/v1/users/user/${userId}/logs`, values)
  }
}
