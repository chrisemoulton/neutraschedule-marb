import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Nutrient } from './nutrient.model'

@Injectable()
export class NutrientDomainFacade {
  constructor(
    @InjectRepository(Nutrient)
    private repository: Repository<Nutrient>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Nutrient>): Promise<Nutrient> {
    return this.repository.save(values)
  }

  async update(item: Nutrient, values: Partial<Nutrient>): Promise<Nutrient> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Nutrient): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Nutrient> = {},
  ): Promise<Nutrient[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Nutrient> = {},
  ): Promise<Nutrient> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }
}
