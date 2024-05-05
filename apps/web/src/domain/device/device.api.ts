import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Device } from './device.model'

export class DeviceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Device>,
  ): Promise<Device[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/devices${buildOptions}`)
  }

  static findOne(
    deviceId: string,
    queryOptions?: ApiHelper.QueryOptions<Device>,
  ): Promise<Device> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/devices/${deviceId}${buildOptions}`)
  }

  static createOne(values: Partial<Device>): Promise<Device> {
    return HttpService.api.post(`/v1/devices`, values)
  }

  static updateOne(deviceId: string, values: Partial<Device>): Promise<Device> {
    return HttpService.api.patch(`/v1/devices/${deviceId}`, values)
  }

  static deleteOne(deviceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/devices/${deviceId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Device>,
  ): Promise<Device[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/devices${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Device>,
  ): Promise<Device> {
    return HttpService.api.post(`/v1/users/user/${userId}/devices`, values)
  }
}
