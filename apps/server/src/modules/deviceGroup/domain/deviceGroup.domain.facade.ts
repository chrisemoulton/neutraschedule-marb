import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { DeviceGroup } from './deviceGroup.model'

import { User } from '../../user/domain'

@Injectable()
export class DeviceGroupDomainFacade {
  constructor(
    @InjectRepository(DeviceGroup)
    private repository: Repository<DeviceGroup>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<DeviceGroup>): Promise<DeviceGroup> {
    return this.repository.save(values)
  }

  async update(
    item: DeviceGroup,
    values: Partial<DeviceGroup>,
  ): Promise<DeviceGroup> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: DeviceGroup): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<DeviceGroup> = {},
  ): Promise<DeviceGroup[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<DeviceGroup> = {},
  ): Promise<DeviceGroup> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<DeviceGroup> = {},
  ): Promise<DeviceGroup[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
