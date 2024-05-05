import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Session } from './session.model'

import { Schedule } from '../../schedule/domain'

@Injectable()
export class SessionDomainFacade {
  constructor(
    @InjectRepository(Session)
    private repository: Repository<Session>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Session>): Promise<Session> {
    return this.repository.save(values)
  }

  async update(item: Session, values: Partial<Session>): Promise<Session> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Session): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Session> = {},
  ): Promise<Session[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Session> = {},
  ): Promise<Session> {
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

  async findManyBySchedule(
    item: Schedule,
    queryOptions: RequestHelper.QueryOptions<Session> = {},
  ): Promise<Session[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('schedule')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        scheduleId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
