import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ShotSchedule } from './shotSchedule.model'

import { Device } from '../../device/domain'

@Injectable()
export class ShotScheduleDomainFacade {
  constructor(
    @InjectRepository(ShotSchedule)
    private repository: Repository<ShotSchedule>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ShotSchedule>): Promise<ShotSchedule> {
    return this.repository.save(values)
  }

  async update(
    item: ShotSchedule,
    values: Partial<ShotSchedule>,
  ): Promise<ShotSchedule> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ShotSchedule): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ShotSchedule> = {},
  ): Promise<ShotSchedule[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ShotSchedule> = {},
  ): Promise<ShotSchedule> {
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
    queryOptions: RequestHelper.QueryOptions<ShotSchedule> = {},
  ): Promise<ShotSchedule[]> {
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
