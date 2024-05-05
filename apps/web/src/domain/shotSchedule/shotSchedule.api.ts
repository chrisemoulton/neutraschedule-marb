import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ShotSchedule } from './shotSchedule.model'

export class ShotScheduleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ShotSchedule>,
  ): Promise<ShotSchedule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/shotSchedules${buildOptions}`)
  }

  static findOne(
    shotScheduleId: string,
    queryOptions?: ApiHelper.QueryOptions<ShotSchedule>,
  ): Promise<ShotSchedule> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/shotSchedules/${shotScheduleId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<ShotSchedule>): Promise<ShotSchedule> {
    return HttpService.api.post(`/v1/shotSchedules`, values)
  }

  static updateOne(
    shotScheduleId: string,
    values: Partial<ShotSchedule>,
  ): Promise<ShotSchedule> {
    return HttpService.api.patch(`/v1/shotSchedules/${shotScheduleId}`, values)
  }

  static deleteOne(shotScheduleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/shotSchedules/${shotScheduleId}`)
  }

  static findManyByDeviceId(
    deviceId: string,
    queryOptions?: ApiHelper.QueryOptions<ShotSchedule>,
  ): Promise<ShotSchedule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/devices/device/${deviceId}/shotSchedules${buildOptions}`,
    )
  }

  static createOneByDeviceId(
    deviceId: string,
    values: Partial<ShotSchedule>,
  ): Promise<ShotSchedule> {
    return HttpService.api.post(
      `/v1/devices/device/${deviceId}/shotSchedules`,
      values,
    )
  }
}
