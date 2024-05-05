import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LogDomainFacade } from '@server/modules/log/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LogApplicationEvent } from './log.application.event'
import { LogCreateDto } from './log.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class LogByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private logDomainFacade: LogDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/logs')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.logDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/logs')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: LogCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.logDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LogApplicationEvent.LogCreated.Payload>(
      LogApplicationEvent.LogCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
