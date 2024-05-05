import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Strain } from './strain.model'

export class StrainApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Strain>,
  ): Promise<Strain[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/strains${buildOptions}`)
  }

  static findOne(
    strainId: string,
    queryOptions?: ApiHelper.QueryOptions<Strain>,
  ): Promise<Strain> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/strains/${strainId}${buildOptions}`)
  }

  static createOne(values: Partial<Strain>): Promise<Strain> {
    return HttpService.api.post(`/v1/strains`, values)
  }

  static updateOne(strainId: string, values: Partial<Strain>): Promise<Strain> {
    return HttpService.api.patch(`/v1/strains/${strainId}`, values)
  }

  static deleteOne(strainId: string): Promise<void> {
    return HttpService.api.delete(`/v1/strains/${strainId}`)
  }
}
