import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { AuthorizationCode } from './authorizationCode.model'

export class AuthorizationCodeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<AuthorizationCode>,
  ): Promise<AuthorizationCode[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/authorizationCodes${buildOptions}`)
  }

  static findOne(
    authorizationCodeId: string,
    queryOptions?: ApiHelper.QueryOptions<AuthorizationCode>,
  ): Promise<AuthorizationCode> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/authorizationCodes/${authorizationCodeId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<AuthorizationCode>,
  ): Promise<AuthorizationCode> {
    return HttpService.api.post(`/v1/authorizationCodes`, values)
  }

  static updateOne(
    authorizationCodeId: string,
    values: Partial<AuthorizationCode>,
  ): Promise<AuthorizationCode> {
    return HttpService.api.patch(
      `/v1/authorizationCodes/${authorizationCodeId}`,
      values,
    )
  }

  static deleteOne(authorizationCodeId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/authorizationCodes/${authorizationCodeId}`,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<AuthorizationCode>,
  ): Promise<AuthorizationCode[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/authorizationCodes${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<AuthorizationCode>,
  ): Promise<AuthorizationCode> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/authorizationCodes`,
      values,
    )
  }
}
