import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Role } from './role.model'

export class RoleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Role>,
  ): Promise<Role[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/roles${buildOptions}`)
  }

  static findOne(
    roleId: string,
    queryOptions?: ApiHelper.QueryOptions<Role>,
  ): Promise<Role> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/roles/${roleId}${buildOptions}`)
  }

  static createOne(values: Partial<Role>): Promise<Role> {
    return HttpService.api.post(`/v1/roles`, values)
  }

  static updateOne(roleId: string, values: Partial<Role>): Promise<Role> {
    return HttpService.api.patch(`/v1/roles/${roleId}`, values)
  }

  static deleteOne(roleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/roles/${roleId}`)
  }
}
