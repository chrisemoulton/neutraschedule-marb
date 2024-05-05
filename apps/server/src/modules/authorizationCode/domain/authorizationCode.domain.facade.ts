import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { AuthorizationCode } from './authorizationCode.model'

import { User } from '../../user/domain'

@Injectable()
export class AuthorizationCodeDomainFacade {
  constructor(
    @InjectRepository(AuthorizationCode)
    private repository: Repository<AuthorizationCode>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<AuthorizationCode>): Promise<AuthorizationCode> {
    return this.repository.save(values)
  }

  async update(
    item: AuthorizationCode,
    values: Partial<AuthorizationCode>,
  ): Promise<AuthorizationCode> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: AuthorizationCode): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<AuthorizationCode> = {},
  ): Promise<AuthorizationCode[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<AuthorizationCode> = {},
  ): Promise<AuthorizationCode> {
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
    queryOptions: RequestHelper.QueryOptions<AuthorizationCode> = {},
  ): Promise<AuthorizationCode[]> {
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
