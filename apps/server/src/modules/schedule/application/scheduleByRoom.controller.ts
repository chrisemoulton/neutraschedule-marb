import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ScheduleDomainFacade } from '@server/modules/schedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ScheduleApplicationEvent } from './schedule.application.event'
import { ScheduleCreateDto } from './schedule.dto'

import { RoomDomainFacade } from '../../room/domain'

@Controller('/v1/rooms')
export class ScheduleByRoomController {
  constructor(
    private roomDomainFacade: RoomDomainFacade,

    private scheduleDomainFacade: ScheduleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/room/:roomId/schedules')
  async findManyRoomId(
    @Param('roomId') roomId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.roomDomainFacade.findOneByIdOrFail(roomId)

    const items = await this.scheduleDomainFacade.findManyByRoom(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/room/:roomId/schedules')
  async createByRoomId(
    @Param('roomId') roomId: string,
    @Body() body: ScheduleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, roomId }

    const item = await this.scheduleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ScheduleApplicationEvent.ScheduleCreated.Payload>(
      ScheduleApplicationEvent.ScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
