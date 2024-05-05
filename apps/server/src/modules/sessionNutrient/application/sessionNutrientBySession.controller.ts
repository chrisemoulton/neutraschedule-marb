import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SessionNutrientDomainFacade } from '@server/modules/sessionNutrient/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SessionNutrientApplicationEvent } from './sessionNutrient.application.event'
import { SessionNutrientCreateDto } from './sessionNutrient.dto'

import { SessionDomainFacade } from '../../session/domain'

@Controller('/v1/sessions')
export class SessionNutrientBySessionController {
  constructor(
    private sessionDomainFacade: SessionDomainFacade,

    private sessionNutrientDomainFacade: SessionNutrientDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/session/:sessionId/sessionNutrients')
  async findManySessionId(
    @Param('sessionId') sessionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.sessionDomainFacade.findOneByIdOrFail(sessionId)

    const items = await this.sessionNutrientDomainFacade.findManyBySession(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/session/:sessionId/sessionNutrients')
  async createBySessionId(
    @Param('sessionId') sessionId: string,
    @Body() body: SessionNutrientCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sessionId }

    const item = await this.sessionNutrientDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SessionNutrientApplicationEvent.SessionNutrientCreated.Payload>(
      SessionNutrientApplicationEvent.SessionNutrientCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
