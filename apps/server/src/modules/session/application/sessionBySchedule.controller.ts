import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SessionDomainFacade } from '@server/modules/session/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SessionApplicationEvent } from './session.application.event'
import { SessionCreateDto } from './session.dto'

import { ScheduleDomainFacade } from '../../schedule/domain'

@Controller('/v1/schedules')
export class SessionByScheduleController {
  constructor(
    private scheduleDomainFacade: ScheduleDomainFacade,

    private sessionDomainFacade: SessionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/schedule/:scheduleId/sessions')
  async findManyScheduleId(
    @Param('scheduleId') scheduleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.scheduleDomainFacade.findOneByIdOrFail(scheduleId)

    const items = await this.sessionDomainFacade.findManyBySchedule(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/schedule/:scheduleId/sessions')
  async createByScheduleId(
    @Param('scheduleId') scheduleId: string,
    @Body() body: SessionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, scheduleId }

    const item = await this.sessionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SessionApplicationEvent.SessionCreated.Payload>(
      SessionApplicationEvent.SessionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
