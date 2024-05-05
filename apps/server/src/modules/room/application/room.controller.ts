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
import { Room, RoomDomainFacade } from '@server/modules/room/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RoomApplicationEvent } from './room.application.event'
import { RoomCreateDto, RoomUpdateDto } from './room.dto'

@Controller('/v1/rooms')
export class RoomController {
  constructor(
    private eventService: EventService,
    private roomDomainFacade: RoomDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.roomDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RoomCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.roomDomainFacade.create(body)

    await this.eventService.emit<RoomApplicationEvent.RoomCreated.Payload>(
      RoomApplicationEvent.RoomCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:roomId')
  async findOne(@Param('roomId') roomId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.roomDomainFacade.findOneByIdOrFail(
      roomId,
      queryOptions,
    )

    return item
  }

  @Patch('/:roomId')
  async update(@Param('roomId') roomId: string, @Body() body: RoomUpdateDto) {
    const item = await this.roomDomainFacade.findOneByIdOrFail(roomId)

    const itemUpdated = await this.roomDomainFacade.update(
      item,
      body as Partial<Room>,
    )
    return itemUpdated
  }

  @Delete('/:roomId')
  async delete(@Param('roomId') roomId: string) {
    const item = await this.roomDomainFacade.findOneByIdOrFail(roomId)

    await this.roomDomainFacade.delete(item)

    return item
  }
}
