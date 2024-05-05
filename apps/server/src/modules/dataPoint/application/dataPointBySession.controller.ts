import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DataPointDomainFacade } from '@server/modules/dataPoint/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DataPointApplicationEvent } from './dataPoint.application.event'
import { DataPointCreateDto } from './dataPoint.dto'

import { SessionDomainFacade } from '../../session/domain'

@Controller('/v1/sessions')
export class DataPointBySessionController {
  constructor(
    private sessionDomainFacade: SessionDomainFacade,

    private dataPointDomainFacade: DataPointDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/session/:sessionId/dataPoints')
  async findManySessionId(
    @Param('sessionId') sessionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.sessionDomainFacade.findOneByIdOrFail(sessionId)

    const items = await this.dataPointDomainFacade.findManyBySession(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/session/:sessionId/dataPoints')
  async createBySessionId(
    @Param('sessionId') sessionId: string,
    @Body() body: DataPointCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sessionId }

    const item = await this.dataPointDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DataPointApplicationEvent.DataPointCreated.Payload>(
      DataPointApplicationEvent.DataPointCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
