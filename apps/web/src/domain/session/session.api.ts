import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Session } from './session.model'

export class SessionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Session>,
  ): Promise<Session[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/sessions${buildOptions}`)
  }

  static findOne(
    sessionId: string,
    queryOptions?: ApiHelper.QueryOptions<Session>,
  ): Promise<Session> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/sessions/${sessionId}${buildOptions}`)
  }

  static createOne(values: Partial<Session>): Promise<Session> {
    return HttpService.api.post(`/v1/sessions`, values)
  }

  static updateOne(
    sessionId: string,
    values: Partial<Session>,
  ): Promise<Session> {
    return HttpService.api.patch(`/v1/sessions/${sessionId}`, values)
  }

  static deleteOne(sessionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/sessions/${sessionId}`)
  }

  static findManyByScheduleId(
    scheduleId: string,
    queryOptions?: ApiHelper.QueryOptions<Session>,
  ): Promise<Session[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/schedules/schedule/${scheduleId}/sessions${buildOptions}`,
    )
  }

  static createOneByScheduleId(
    scheduleId: string,
    values: Partial<Session>,
  ): Promise<Session> {
    return HttpService.api.post(
      `/v1/schedules/schedule/${scheduleId}/sessions`,
      values,
    )
  }
}
