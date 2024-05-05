import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { LowLiquidWarning } from './lowLiquidWarning.model'

import { LiquidLevel } from '../../liquidLevel/domain'

@Injectable()
export class LowLiquidWarningDomainFacade {
  constructor(
    @InjectRepository(LowLiquidWarning)
    private repository: Repository<LowLiquidWarning>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<LowLiquidWarning>): Promise<LowLiquidWarning> {
    return this.repository.save(values)
  }

  async update(
    item: LowLiquidWarning,
    values: Partial<LowLiquidWarning>,
  ): Promise<LowLiquidWarning> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: LowLiquidWarning): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<LowLiquidWarning> = {},
  ): Promise<LowLiquidWarning[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<LowLiquidWarning> = {},
  ): Promise<LowLiquidWarning> {
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

  async findManyByLevel(
    item: LiquidLevel,
    queryOptions: RequestHelper.QueryOptions<LowLiquidWarning> = {},
  ): Promise<LowLiquidWarning[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('level')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        levelId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
