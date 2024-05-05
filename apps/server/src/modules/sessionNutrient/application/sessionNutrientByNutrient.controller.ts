import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SessionNutrientDomainFacade } from '@server/modules/sessionNutrient/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SessionNutrientApplicationEvent } from './sessionNutrient.application.event'
import { SessionNutrientCreateDto } from './sessionNutrient.dto'

import { NutrientDomainFacade } from '../../nutrient/domain'

@Controller('/v1/nutrients')
export class SessionNutrientByNutrientController {
  constructor(
    private nutrientDomainFacade: NutrientDomainFacade,

    private sessionNutrientDomainFacade: SessionNutrientDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/nutrient/:nutrientId/sessionNutrients')
  async findManyNutrientId(
    @Param('nutrientId') nutrientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.nutrientDomainFacade.findOneByIdOrFail(nutrientId)

    const items = await this.sessionNutrientDomainFacade.findManyByNutrient(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/nutrient/:nutrientId/sessionNutrients')
  async createByNutrientId(
    @Param('nutrientId') nutrientId: string,
    @Body() body: SessionNutrientCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, nutrientId }

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
