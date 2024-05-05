import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DeviceGroupMembership } from './deviceGroupMembership.model'

export class DeviceGroupMembershipApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/deviceGroupMemberships${buildOptions}`)
  }

  static findOne(
    deviceGroupMembershipId: string,
    queryOptions?: ApiHelper.QueryOptions<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/deviceGroupMemberships/${deviceGroupMembershipId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    return HttpService.api.post(`/v1/deviceGroupMemberships`, values)
  }

  static updateOne(
    deviceGroupMembershipId: string,
    values: Partial<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    return HttpService.api.patch(
      `/v1/deviceGroupMemberships/${deviceGroupMembershipId}`,
      values,
    )
  }

  static deleteOne(deviceGroupMembershipId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/deviceGroupMemberships/${deviceGroupMembershipId}`,
    )
  }

  static findManyByGroupId(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/deviceGroups/group/${groupId}/deviceGroupMemberships${buildOptions}`,
    )
  }

  static createOneByGroupId(
    groupId: string,
    values: Partial<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    return HttpService.api.post(
      `/v1/deviceGroups/group/${groupId}/deviceGroupMemberships`,
      values,
    )
  }

  static findManyByDeviceId(
    deviceId: string,
    queryOptions?: ApiHelper.QueryOptions<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/devices/device/${deviceId}/deviceGroupMemberships${buildOptions}`,
    )
  }

  static createOneByDeviceId(
    deviceId: string,
    values: Partial<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    return HttpService.api.post(
      `/v1/devices/device/${deviceId}/deviceGroupMemberships`,
      values,
    )
  }
}
