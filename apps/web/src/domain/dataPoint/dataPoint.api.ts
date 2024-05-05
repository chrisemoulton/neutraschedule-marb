import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DataPoint } from './dataPoint.model'

export class DataPointApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DataPoint>,
  ): Promise<DataPoint[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/dataPoints${buildOptions}`)
  }

  static findOne(
    dataPointId: string,
    queryOptions?: ApiHelper.QueryOptions<DataPoint>,
  ): Promise<DataPoint> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/dataPoints/${dataPointId}${buildOptions}`)
  }

  static createOne(values: Partial<DataPoint>): Promise<DataPoint> {
    return HttpService.api.post(`/v1/dataPoints`, values)
  }

  static updateOne(
    dataPointId: string,
    values: Partial<DataPoint>,
  ): Promise<DataPoint> {
    return HttpService.api.patch(`/v1/dataPoints/${dataPointId}`, values)
  }

  static deleteOne(dataPointId: string): Promise<void> {
    return HttpService.api.delete(`/v1/dataPoints/${dataPointId}`)
  }

  static findManyBySessionId(
    sessionId: string,
    queryOptions?: ApiHelper.QueryOptions<DataPoint>,
  ): Promise<DataPoint[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/sessions/session/${sessionId}/dataPoints${buildOptions}`,
    )
  }

  static createOneBySessionId(
    sessionId: string,
    values: Partial<DataPoint>,
  ): Promise<DataPoint> {
    return HttpService.api.post(
      `/v1/sessions/session/${sessionId}/dataPoints`,
      values,
    )
  }
}
