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
import { Session, SessionDomainFacade } from '@server/modules/session/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SessionApplicationEvent } from './session.application.event'
import { SessionCreateDto, SessionUpdateDto } from './session.dto'

@Controller('/v1/sessions')
export class SessionController {
  constructor(
    private eventService: EventService,
    private sessionDomainFacade: SessionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.sessionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SessionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.sessionDomainFacade.create(body)

    await this.eventService.emit<SessionApplicationEvent.SessionCreated.Payload>(
      SessionApplicationEvent.SessionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:sessionId')
  async findOne(
    @Param('sessionId') sessionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.sessionDomainFacade.findOneByIdOrFail(
      sessionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:sessionId')
  async update(
    @Param('sessionId') sessionId: string,
    @Body() body: SessionUpdateDto,
  ) {
    const item = await this.sessionDomainFacade.findOneByIdOrFail(sessionId)

    const itemUpdated = await this.sessionDomainFacade.update(
      item,
      body as Partial<Session>,
    )
    return itemUpdated
  }

  @Delete('/:sessionId')
  async delete(@Param('sessionId') sessionId: string) {
    const item = await this.sessionDomainFacade.findOneByIdOrFail(sessionId)

    await this.sessionDomainFacade.delete(item)

    return item
  }
}
