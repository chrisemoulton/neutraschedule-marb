import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DeviceGroup } from './deviceGroup.model'

export class DeviceGroupApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DeviceGroup>,
  ): Promise<DeviceGroup[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/deviceGroups${buildOptions}`)
  }

  static findOne(
    deviceGroupId: string,
    queryOptions?: ApiHelper.QueryOptions<DeviceGroup>,
  ): Promise<DeviceGroup> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/deviceGroups/${deviceGroupId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<DeviceGroup>): Promise<DeviceGroup> {
    return HttpService.api.post(`/v1/deviceGroups`, values)
  }

  static updateOne(
    deviceGroupId: string,
    values: Partial<DeviceGroup>,
  ): Promise<DeviceGroup> {
    return HttpService.api.patch(`/v1/deviceGroups/${deviceGroupId}`, values)
  }

  static deleteOne(deviceGroupId: string): Promise<void> {
    return HttpService.api.delete(`/v1/deviceGroups/${deviceGroupId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<DeviceGroup>,
  ): Promise<DeviceGroup[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/deviceGroups${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<DeviceGroup>,
  ): Promise<DeviceGroup> {
    return HttpService.api.post(`/v1/users/user/${userId}/deviceGroups`, values)
  }
}
