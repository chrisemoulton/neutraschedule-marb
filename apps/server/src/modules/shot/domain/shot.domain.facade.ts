import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Shot } from './shot.model'

import { Device } from '../../device/domain'

@Injectable()
export class ShotDomainFacade {
  constructor(
    @InjectRepository(Shot)
    private repository: Repository<Shot>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Shot>): Promise<Shot> {
    return this.repository.save(values)
  }

  async update(item: Shot, values: Partial<Shot>): Promise<Shot> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Shot): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Shot> = {},
  ): Promise<Shot[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Shot> = {},
  ): Promise<Shot> {
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
    queryOptions: RequestHelper.QueryOptions<Shot> = {},
  ): Promise<Shot[]> {
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
