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
  ShotSchedule,
  ShotScheduleDomainFacade,
} from '@server/modules/shotSchedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ShotScheduleApplicationEvent } from './shotSchedule.application.event'
import {
  ShotScheduleCreateDto,
  ShotScheduleUpdateDto,
} from './shotSchedule.dto'

@Controller('/v1/shotSchedules')
export class ShotScheduleController {
  constructor(
    private eventService: EventService,
    private shotScheduleDomainFacade: ShotScheduleDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.shotScheduleDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ShotScheduleCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.shotScheduleDomainFacade.create(body)

    await this.eventService.emit<ShotScheduleApplicationEvent.ShotScheduleCreated.Payload>(
      ShotScheduleApplicationEvent.ShotScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:shotScheduleId')
  async findOne(
    @Param('shotScheduleId') shotScheduleId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.shotScheduleDomainFacade.findOneByIdOrFail(
      shotScheduleId,
      queryOptions,
    )

    return item
  }

  @Patch('/:shotScheduleId')
  async update(
    @Param('shotScheduleId') shotScheduleId: string,
    @Body() body: ShotScheduleUpdateDto,
  ) {
    const item =
      await this.shotScheduleDomainFacade.findOneByIdOrFail(shotScheduleId)

    const itemUpdated = await this.shotScheduleDomainFacade.update(
      item,
      body as Partial<ShotSchedule>,
    )
    return itemUpdated
  }

  @Delete('/:shotScheduleId')
  async delete(@Param('shotScheduleId') shotScheduleId: string) {
    const item =
      await this.shotScheduleDomainFacade.findOneByIdOrFail(shotScheduleId)

    await this.shotScheduleDomainFacade.delete(item)

    return item
  }
}
