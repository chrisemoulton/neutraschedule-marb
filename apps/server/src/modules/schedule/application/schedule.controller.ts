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
import { Schedule, ScheduleDomainFacade } from '@server/modules/schedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ScheduleApplicationEvent } from './schedule.application.event'
import { ScheduleCreateDto, ScheduleUpdateDto } from './schedule.dto'

@Controller('/v1/schedules')
export class ScheduleController {
  constructor(
    private eventService: EventService,
    private scheduleDomainFacade: ScheduleDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.scheduleDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ScheduleCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.scheduleDomainFacade.create(body)

    await this.eventService.emit<ScheduleApplicationEvent.ScheduleCreated.Payload>(
      ScheduleApplicationEvent.ScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:scheduleId')
  async findOne(
    @Param('scheduleId') scheduleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.scheduleDomainFacade.findOneByIdOrFail(
      scheduleId,
      queryOptions,
    )

    return item
  }

  @Patch('/:scheduleId')
  async update(
    @Param('scheduleId') scheduleId: string,
    @Body() body: ScheduleUpdateDto,
  ) {
    const item = await this.scheduleDomainFacade.findOneByIdOrFail(scheduleId)

    const itemUpdated = await this.scheduleDomainFacade.update(
      item,
      body as Partial<Schedule>,
    )
    return itemUpdated
  }

  @Delete('/:scheduleId')
  async delete(@Param('scheduleId') scheduleId: string) {
    const item = await this.scheduleDomainFacade.findOneByIdOrFail(scheduleId)

    await this.scheduleDomainFacade.delete(item)

    return item
  }
}
