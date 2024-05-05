import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Nutrient } from './nutrient.model'

export class NutrientApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Nutrient>,
  ): Promise<Nutrient[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/nutrients${buildOptions}`)
  }

  static findOne(
    nutrientId: string,
    queryOptions?: ApiHelper.QueryOptions<Nutrient>,
  ): Promise<Nutrient> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/nutrients/${nutrientId}${buildOptions}`)
  }

  static createOne(values: Partial<Nutrient>): Promise<Nutrient> {
    return HttpService.api.post(`/v1/nutrients`, values)
  }

  static updateOne(
    nutrientId: string,
    values: Partial<Nutrient>,
  ): Promise<Nutrient> {
    return HttpService.api.patch(`/v1/nutrients/${nutrientId}`, values)
  }

  static deleteOne(nutrientId: string): Promise<void> {
    return HttpService.api.delete(`/v1/nutrients/${nutrientId}`)
  }
}
