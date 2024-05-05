import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { EnvironmentalConditionDomainFacade } from '@server/modules/environmentalCondition/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { EnvironmentalConditionApplicationEvent } from './environmentalCondition.application.event'
import { EnvironmentalConditionCreateDto } from './environmentalCondition.dto'

import { SessionDomainFacade } from '../../session/domain'

@Controller('/v1/sessions')
export class EnvironmentalConditionBySessionController {
  constructor(
    private sessionDomainFacade: SessionDomainFacade,

    private environmentalConditionDomainFacade: EnvironmentalConditionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/session/:sessionId/environmentalConditions')
  async findManySessionId(
    @Param('sessionId') sessionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.sessionDomainFacade.findOneByIdOrFail(sessionId)

    const items =
      await this.environmentalConditionDomainFacade.findManyBySession(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/session/:sessionId/environmentalConditions')
  async createBySessionId(
    @Param('sessionId') sessionId: string,
    @Body() body: EnvironmentalConditionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sessionId }

    const item =
      await this.environmentalConditionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<EnvironmentalConditionApplicationEvent.EnvironmentalConditionCreated.Payload>(
      EnvironmentalConditionApplicationEvent.EnvironmentalConditionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
