import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ScheduleDomainFacade } from '@server/modules/schedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ScheduleApplicationEvent } from './schedule.application.event'
import { ScheduleCreateDto } from './schedule.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ScheduleByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private scheduleDomainFacade: ScheduleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/schedules')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.scheduleDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/schedules')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ScheduleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.scheduleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ScheduleApplicationEvent.ScheduleCreated.Payload>(
      ScheduleApplicationEvent.ScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
