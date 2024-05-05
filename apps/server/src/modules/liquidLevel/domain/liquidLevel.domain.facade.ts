import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { LiquidLevel } from './liquidLevel.model'

import { Device } from '../../device/domain'

@Injectable()
export class LiquidLevelDomainFacade {
  constructor(
    @InjectRepository(LiquidLevel)
    private repository: Repository<LiquidLevel>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<LiquidLevel>): Promise<LiquidLevel> {
    return this.repository.save(values)
  }

  async update(
    item: LiquidLevel,
    values: Partial<LiquidLevel>,
  ): Promise<LiquidLevel> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: LiquidLevel): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<LiquidLevel> = {},
  ): Promise<LiquidLevel[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<LiquidLevel> = {},
  ): Promise<LiquidLevel> {
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

  async findManyByDevice(
    item: Device,
    queryOptions: RequestHelper.QueryOptions<LiquidLevel> = {},
  ): Promise<LiquidLevel[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('device')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        deviceId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
