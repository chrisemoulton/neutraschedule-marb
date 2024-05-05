import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { EnvironmentalCondition } from './environmentalCondition.model'

import { Session } from '../../session/domain'

@Injectable()
export class EnvironmentalConditionDomainFacade {
  constructor(
    @InjectRepository(EnvironmentalCondition)
    private repository: Repository<EnvironmentalCondition>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition> {
    return this.repository.save(values)
  }

  async update(
    item: EnvironmentalCondition,
    values: Partial<EnvironmentalCondition>,
  ): Promise<EnvironmentalCondition> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: EnvironmentalCondition): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<EnvironmentalCondition> = {},
  ): Promise<EnvironmentalCondition[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<EnvironmentalCondition> = {},
  ): Promise<EnvironmentalCondition> {
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
    queryOptions: RequestHelper.QueryOptions<EnvironmentalCondition> = {},
  ): Promise<EnvironmentalCondition[]> {
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
