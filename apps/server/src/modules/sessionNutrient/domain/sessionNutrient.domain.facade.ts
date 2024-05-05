import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { SessionNutrient } from './sessionNutrient.model'

import { Session } from '../../session/domain'

import { Nutrient } from '../../nutrient/domain'

@Injectable()
export class SessionNutrientDomainFacade {
  constructor(
    @InjectRepository(SessionNutrient)
    private repository: Repository<SessionNutrient>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<SessionNutrient>): Promise<SessionNutrient> {
    return this.repository.save(values)
  }

  async update(
    item: SessionNutrient,
    values: Partial<SessionNutrient>,
  ): Promise<SessionNutrient> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: SessionNutrient): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<SessionNutrient> = {},
  ): Promise<SessionNutrient[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<SessionNutrient> = {},
  ): Promise<SessionNutrient> {
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
    queryOptions: RequestHelper.QueryOptions<SessionNutrient> = {},
  ): Promise<SessionNutrient[]> {
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

  async findManyByNutrient(
    item: Nutrient,
    queryOptions: RequestHelper.QueryOptions<SessionNutrient> = {},
  ): Promise<SessionNutrient[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('nutrient')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        nutrientId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
