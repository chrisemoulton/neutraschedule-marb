import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { DeviceGroupMembership } from './deviceGroupMembership.model'

import { DeviceGroup } from '../../deviceGroup/domain'

import { Device } from '../../device/domain'

@Injectable()
export class DeviceGroupMembershipDomainFacade {
  constructor(
    @InjectRepository(DeviceGroupMembership)
    private repository: Repository<DeviceGroupMembership>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    return this.repository.save(values)
  }

  async update(
    item: DeviceGroupMembership,
    values: Partial<DeviceGroupMembership>,
  ): Promise<DeviceGroupMembership> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: DeviceGroupMembership): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<DeviceGroupMembership> = {},
  ): Promise<DeviceGroupMembership[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<DeviceGroupMembership> = {},
  ): Promise<DeviceGroupMembership> {
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

  async findManyByGroup(
    item: DeviceGroup,
    queryOptions: RequestHelper.QueryOptions<DeviceGroupMembership> = {},
  ): Promise<DeviceGroupMembership[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('group')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        groupId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByDevice(
    item: Device,
    queryOptions: RequestHelper.QueryOptions<DeviceGroupMembership> = {},
  ): Promise<DeviceGroupMembership[]> {
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
