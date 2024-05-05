import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Schedule } from './schedule.model'

export class ScheduleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Schedule>,
  ): Promise<Schedule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/schedules${buildOptions}`)
  }

  static findOne(
    scheduleId: string,
    queryOptions?: ApiHelper.QueryOptions<Schedule>,
  ): Promise<Schedule> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/schedules/${scheduleId}${buildOptions}`)
  }

  static createOne(values: Partial<Schedule>): Promise<Schedule> {
    return HttpService.api.post(`/v1/schedules`, values)
  }

  static updateOne(
    scheduleId: string,
    values: Partial<Schedule>,
  ): Promise<Schedule> {
    return HttpService.api.patch(`/v1/schedules/${scheduleId}`, values)
  }

  static deleteOne(scheduleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/schedules/${scheduleId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Schedule>,
  ): Promise<Schedule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/schedules${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Schedule>,
  ): Promise<Schedule> {
    return HttpService.api.post(`/v1/users/user/${userId}/schedules`, values)
  }

  static findManyByRoomId(
    roomId: string,
    queryOptions?: ApiHelper.QueryOptions<Schedule>,
  ): Promise<Schedule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/rooms/room/${roomId}/schedules${buildOptions}`,
    )
  }

  static createOneByRoomId(
    roomId: string,
    values: Partial<Schedule>,
  ): Promise<Schedule> {
    return HttpService.api.post(`/v1/rooms/room/${roomId}/schedules`, values)
  }

  static findManyByStrainId(
    strainId: string,
    queryOptions?: ApiHelper.QueryOptions<Schedule>,
  ): Promise<Schedule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/strains/strain/${strainId}/schedules${buildOptions}`,
    )
  }

  static createOneByStrainId(
    strainId: string,
    values: Partial<Schedule>,
  ): Promise<Schedule> {
    return HttpService.api.post(
      `/v1/strains/strain/${strainId}/schedules`,
      values,
    )
  }
}
