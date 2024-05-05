import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  SessionNutrient,
  SessionNutrientDomainFacade,
} from '@server/modules/sessionNutrient/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SessionNutrientApplicationEvent } from './sessionNutrient.application.event'
import {
  SessionNutrientCreateDto,
  SessionNutrientUpdateDto,
} from './sessionNutrient.dto'

@Controller('/v1/sessionNutrients')
export class SessionNutrientController {
  constructor(
    private eventService: EventService,
    private sessionNutrientDomainFacade: SessionNutrientDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.sessionNutrientDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: SessionNutrientCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.sessionNutrientDomainFacade.create(body)

    await this.eventService.emit<SessionNutrientApplicationEvent.SessionNutrientCreated.Payload>(
      SessionNutrientApplicationEvent.SessionNutrientCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:sessionNutrientId')
  async findOne(
    @Param('sessionNutrientId') sessionNutrientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.sessionNutrientDomainFacade.findOneByIdOrFail(
      sessionNutrientId,
      queryOptions,
    )

    return item
  }

  @Patch('/:sessionNutrientId')
  async update(
    @Param('sessionNutrientId') sessionNutrientId: string,
    @Body() body: SessionNutrientUpdateDto,
  ) {
    const item =
      await this.sessionNutrientDomainFacade.findOneByIdOrFail(
        sessionNutrientId,
      )

    const itemUpdated = await this.sessionNutrientDomainFacade.update(
      item,
      body as Partial<SessionNutrient>,
    )
    return itemUpdated
  }

  @Delete('/:sessionNutrientId')
  async delete(@Param('sessionNutrientId') sessionNutrientId: string) {
    const item =
      await this.sessionNutrientDomainFacade.findOneByIdOrFail(
        sessionNutrientId,
      )

    await this.sessionNutrientDomainFacade.delete(item)

    return item
  }
}
