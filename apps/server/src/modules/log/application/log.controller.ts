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
import { Log, LogDomainFacade } from '@server/modules/log/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LogApplicationEvent } from './log.application.event'
import { LogCreateDto, LogUpdateDto } from './log.dto'

@Controller('/v1/logs')
export class LogController {
  constructor(
    private eventService: EventService,
    private logDomainFacade: LogDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.logDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: LogCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.logDomainFacade.create(body)

    await this.eventService.emit<LogApplicationEvent.LogCreated.Payload>(
      LogApplicationEvent.LogCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:logId')
  async findOne(@Param('logId') logId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.logDomainFacade.findOneByIdOrFail(
      logId,
      queryOptions,
    )

    return item
  }

  @Patch('/:logId')
  async update(@Param('logId') logId: string, @Body() body: LogUpdateDto) {
    const item = await this.logDomainFacade.findOneByIdOrFail(logId)

    const itemUpdated = await this.logDomainFacade.update(
      item,
      body as Partial<Log>,
    )
    return itemUpdated
  }

  @Delete('/:logId')
  async delete(@Param('logId') logId: string) {
    const item = await this.logDomainFacade.findOneByIdOrFail(logId)

    await this.logDomainFacade.delete(item)

    return item
  }
}
