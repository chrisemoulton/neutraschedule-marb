import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { DataPoint } from './dataPoint.model'

import { Session } from '../../session/domain'

@Injectable()
export class DataPointDomainFacade {
  constructor(
    @InjectRepository(DataPoint)
    private repository: Repository<DataPoint>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<DataPoint>): Promise<DataPoint> {
    return this.repository.save(values)
  }

  async update(
    item: DataPoint,
    values: Partial<DataPoint>,
  ): Promise<DataPoint> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: DataPoint): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<DataPoint> = {},
  ): Promise<DataPoint[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<DataPoint> = {},
  ): Promise<DataPoint> {
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

  async findManyBySession(
    item: Session,
    queryOptions: RequestHelper.QueryOptions<DataPoint> = {},
  ): Promise<DataPoint[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('session')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        sessionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
