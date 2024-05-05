import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Room } from './room.model'

export class RoomApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Room>,
  ): Promise<Room[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rooms${buildOptions}`)
  }

  static findOne(
    roomId: string,
    queryOptions?: ApiHelper.QueryOptions<Room>,
  ): Promise<Room> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rooms/${roomId}${buildOptions}`)
  }

  static createOne(values: Partial<Room>): Promise<Room> {
    return HttpService.api.post(`/v1/rooms`, values)
  }

  static updateOne(roomId: string, values: Partial<Room>): Promise<Room> {
    return HttpService.api.patch(`/v1/rooms/${roomId}`, values)
  }

  static deleteOne(roomId: string): Promise<void> {
    return HttpService.api.delete(`/v1/rooms/${roomId}`)
  }
}
